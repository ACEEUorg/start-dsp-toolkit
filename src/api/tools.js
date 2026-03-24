import { Router } from 'express';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { listTools, getTool, updateTool, createTool, deleteTool } from '../lib/files.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = join(__dirname, '..', '..');

const router = Router();

function regenerateToolsJson() {
  return new Promise((resolve, reject) => {
    const proc = spawn('node', ['scripts/generate-tools-json.js'], {
      cwd: ROOT_DIR
    });
    let output = '';
    proc.stdout.on('data', (data) => output += data);
    proc.stderr.on('data', (data) => output += data);
    proc.on('close', (code) => {
      if (code === 0) resolve(output);
      else reject(new Error(output));
    });
  });
}

// List all tools (optionally filtered by lang)
router.get('/', (req, res) => {
  const { lang } = req.query;
  
  if (lang) {
    return res.json({ 
      lang, 
      tools: listTools(lang) 
    });
  }
  
  // Return all languages
  const languages = ['en', 'es', 'de', 'el'];
  const result = {};
  
  for (const l of languages) {
    result[l] = listTools(l);
  }
  
  res.json(result);
});

// List tools for specific language
router.get('/:lang', (req, res) => {
  const { lang } = req.params;
  const tools = listTools(lang);
  res.json({ lang, tools });
});

// Get single tool
router.get('/:lang/:filename', (req, res) => {
  const { lang, filename } = req.params;
  const tool = getTool(lang, filename);
  
  if (!tool) {
    return res.status(404).json({ error: 'Tool not found' });
  }
  
  res.json(tool);
});

// Create new tool
router.post('/:lang', async (req, res) => {
  const { lang } = req.params;
  
  try {
    const tool = createTool(lang, req.body);
    await regenerateToolsJson();
    res.status(201).json(tool);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update tool
router.put('/:lang/:filename', async (req, res) => {
  const { lang, filename } = req.params;
  
  try {
    const tool = updateTool(lang, filename, req.body);
    await regenerateToolsJson();
    res.json(tool);
  } catch (err) {
    if (err.message.includes('not found')) {
      return res.status(404).json({ error: err.message });
    }
    res.status(500).json({ error: err.message });
  }
});

// Delete tool
router.delete('/:lang/:filename', async (req, res) => {
  const { lang, filename } = req.params;
  
  try {
    const result = deleteTool(lang, filename);
    await regenerateToolsJson();
    res.json(result);
  } catch (err) {
    if (err.message.includes('not found')) {
      return res.status(404).json({ error: err.message });
    }
    res.status(500).json({ error: err.message });
  }
});

export default router;
