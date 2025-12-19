#!/usr/bin/env node

/**
 * Reorganize tools from tool-based folders to language-based folders
 * FROM: content/tools/01-tool-1/en.md
 * TO:   content/tools/en/01-tool-1.md
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');

const languages = ['en', 'es', 'de', 'el'];
const toolsDir = join(rootDir, 'content/tools');

console.log('Reorganizing tools by language...\n');

// Create language directories
for (const lang of languages) {
  const langDir = join(toolsDir, lang);
  mkdirSync(langDir, { recursive: true });
  console.log(`Created ${lang}/ directory`);
}

// Get all tool directories
const toolDirs = readdirSync(toolsDir)
  .filter(name => {
    const path = join(toolsDir, name);
    return statSync(path).isDirectory() && !languages.includes(name);
  })
  .sort();

console.log(`\nFound ${toolDirs.length} tool directories\n`);

// Move files
for (const toolDir of toolDirs) {
  console.log(`Processing ${toolDir}...`);
  const toolPath = join(toolsDir, toolDir);

  for (const lang of languages) {
    const sourcePath = join(toolPath, `${lang}.md`);
    const targetPath = join(toolsDir, lang, `${toolDir}.md`);

    try {
      const content = readFileSync(sourcePath, 'utf-8');
      writeFileSync(targetPath, content, 'utf-8');
      console.log(`  Moved ${lang}.md -> ${lang}/${toolDir}.md`);
    } catch (error) {
      console.log(`  Skipped ${lang}.md (not found)`);
    }
  }
}

console.log('\nReorganization complete!');
console.log('Old tool directories can now be deleted.');
