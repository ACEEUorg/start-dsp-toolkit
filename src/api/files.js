import { Router } from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { requireAuth, requireRole } from '../lib/auth.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, '..', '..');
const ASSETS_DIR = join(PROJECT_ROOT, 'public', 'assets');

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const subdir = req.query.folder || '';
    const dest = subdir ? join(ASSETS_DIR, subdir) : ASSETS_DIR;
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB
});

// List files in a directory
router.get('/files', (req, res) => {
  const folder = req.query.folder || '';
  const dir = folder ? join(ASSETS_DIR, folder) : ASSETS_DIR;
  
  if (!fs.existsSync(dir)) {
    return res.json({ files: [], folders: [] });
  }
  
  const items = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  const folders = [];
  
  for (const item of items) {
    const itemPath = join(dir, item.name);
    const relativePath = folder ? `${folder}/${item.name}` : item.name;
    
    if (item.isDirectory()) {
      folders.push({ name: item.name, path: relativePath });
    } else {
      const stats = fs.statSync(itemPath);
      files.push({
        name: item.name,
        path: `/${relativePath}`,
        size: stats.size,
        modified: stats.mtime
      });
    }
  }
  
  res.json({ files, folders });
});

// List all assets recursively (for search)
router.get('/files/all', (req, res) => {
  function walkDir(dir, base = '') {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    const result = [];
    
    for (const item of items) {
      const itemPath = join(dir, item.name);
      const relativePath = base ? `${base}/${item.name}` : item.name;
      
      if (item.isDirectory()) {
        result.push(...walkDir(itemPath, relativePath));
      } else {
        result.push({
          name: item.name,
          path: `/assets/${relativePath}`
        });
      }
    }
    return result;
  }
  
  if (!fs.existsSync(ASSETS_DIR)) {
    return res.json({ files: [] });
  }
  
  const files = walkDir(ASSETS_DIR);
  res.json({ files });
});

// Upload file
router.post('/upload', requireAuth, upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  const path = `/assets/${req.file.filename.replace(/^\/assets\//, '')}`;
  res.json({ 
    success: true,
    path,
    filename: req.file.filename,
    originalName: req.file.originalname
  });
});

export default router;
