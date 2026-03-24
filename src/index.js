import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { initDb } from './lib/db.js';
import { requireAuth, requireRole } from './lib/auth.js';
import authRoutes from './api/auth.js';
import toolsRoutes from './api/tools.js';
import usersRoutes from './api/users.js';
import syncRoutes from './api/sync.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const ADMIN_FORMS = join(__dirname, 'admin', 'forms');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize database
initDb();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: true,
  credentials: true
}));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'dev-secret-change-in-production',
  resave: false,
  saveUninitialized: false,
  proxy: true, // Trust the reverse proxy (Caddy)
  cookie: {
    secure: true,
    httpOnly: true,
    maxAge: 8 * 60 * 60 * 1000 // 8 hours
  }
}));

// Static files (admin UI)
app.use('/admin', express.static(ADMIN_FORMS));

// Serve public data files first (for live preview)
app.use('/data', express.static(join(ROOT, 'public', 'data')));

// Serve preview frontend from dist/
app.use(express.static(join(ROOT, 'dist')));

// Serve public assets (images, PDFs, etc)
app.use('/assets', express.static(join(ROOT, 'public', 'assets')));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/tools', requireAuth, toolsRoutes);
app.use('/api/users', requireAuth, requireRole('admin'), usersRoutes);
app.use('/api/sync', requireAuth, requireRole('admin'), syncRoutes);

// Admin routes (HTML pages)
app.get('/admin', (req, res) => {
  if (req.session.userId) {
    res.redirect('/admin/tools');
  } else {
    res.sendFile(join(ADMIN_FORMS, 'login.html'));
  }
});

function requireAuthHtml(req, res, next) {
  if (!req.session || !req.session.userId) {
    return res.redirect('/admin');
  }
  next();
}

function requireRoleHtml(role) {
  return (req, res, next) => {
    if (!req.session || !req.session.userId) {
      return res.redirect('/admin');
    }
    if (req.session.role !== role) {
      return res.status(403).send('Forbidden');
    }
    next();
  };
}

app.get('/admin/tools', requireAuthHtml, (req, res) => {
  res.sendFile(join(ADMIN_FORMS, 'tools-list.html'));
});

app.get('/admin/tools/:lang/:id', requireAuthHtml, (req, res) => {
  res.sendFile(join(ADMIN_FORMS, 'tool-edit.html'));
});

app.get('/admin/users', requireAuthHtml, requireRoleHtml('admin'), (req, res) => {
  res.sendFile(join(ADMIN_FORMS, 'users.html'));
});

app.get('/admin/forgot-password', (req, res) => {
  res.sendFile(join(ADMIN_FORMS, 'forgot-password.html'));
});

app.get('/admin/reset-password', (req, res) => {
  res.sendFile(join(ADMIN_FORMS, 'reset-password.html'));
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Simple Admin running at http://localhost:${PORT}/admin`);
  console.log(`\nFirst time? Run: node src/scripts/seed-admin.js`);
});
