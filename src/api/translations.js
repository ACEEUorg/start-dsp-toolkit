import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import yaml from 'js-yaml';
import { requireAuth, requireRole } from '../lib/auth.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, '..', '..');
const TRANSLATIONS_DIR = join(PROJECT_ROOT, 'src', 'i18n', 'translations');

const router = Router();

const SUPPORTED_LANGUAGES = ['en', 'es', 'de', 'el'];

// Get all translations
router.get('/', requireAuth, (req, res) => {
  const translations = {};
  
  for (const lang of SUPPORTED_LANGUAGES) {
    const filePath = join(TRANSLATIONS_DIR, `${lang}.yml`);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      translations[lang] = yaml.load(content);
    } else {
      translations[lang] = {};
    }
  }
  
  res.json({ translations, languages: SUPPORTED_LANGUAGES });
});

// Get single language translations
router.get('/:lang', requireAuth, (req, res) => {
  const { lang } = req.params;
  
  if (!SUPPORTED_LANGUAGES.includes(lang)) {
    return res.status(400).json({ error: 'Unsupported language' });
  }
  
  const filePath = join(TRANSLATIONS_DIR, `${lang}.yml`);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'Translation file not found' });
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  const translations = yaml.load(content);
  
  res.json({ lang, translations });
});

// Update single language translations
router.put('/:lang', requireAuth, (req, res) => {
  const { lang } = req.params;
  const { translations } = req.body;
  
  if (!SUPPORTED_LANGUAGES.includes(lang)) {
    return res.status(400).json({ error: 'Unsupported language' });
  }
  
  if (!translations || typeof translations !== 'object') {
    return res.status(400).json({ error: 'Invalid translations data' });
  }
  
  const filePath = join(TRANSLATIONS_DIR, `${lang}.yml`);
  
  try {
    const yamlContent = yaml.dump(translations, { 
      lineWidth: -1, 
      quotingType: '"',
      forceQuotes: true
    });
    fs.writeFileSync(filePath, yamlContent, 'utf8');
    
    res.json({ success: true, lang, message: 'Translations saved' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save translations: ' + err.message });
  }
});

export default router;
