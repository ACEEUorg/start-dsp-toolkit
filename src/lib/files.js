import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const contentRoot = join(__dirname, '..', '..', 'content');

const LANGUAGES = ['en', 'es', 'de', 'el'];

export function getToolsDir(lang) {
  return join(contentRoot, 'tools', lang);
}

export function getToolPath(lang, filename) {
  return join(getToolsDir(lang), filename);
}

export function listTools(lang) {
  const dir = getToolsDir(lang);
  
  if (!fs.existsSync(dir)) {
    return [];
  }

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
  
  return files.map(filename => {
    const filepath = join(dir, filename);
    const content = fs.readFileSync(filepath, 'utf-8');
    const { data } = matter(content);
    
    return {
      filename,
      number: data.number,
      name: data.name,
      purpose: data.purpose,
      summary: data.summary,
      partner: data.partner
    };
  }).sort((a, b) => a.number - b.number);
}

export function getTool(lang, filename) {
  const filepath = getToolPath(lang, filename);
  
  if (!fs.existsSync(filepath)) {
    return null;
  }

  const content = fs.readFileSync(filepath, 'utf-8');
  const { data, content: body } = matter(content);

  return {
    filename,
    ...data,
    body: body.trim()
  };
}

export function updateTool(lang, filename, data) {
  const filepath = getToolPath(lang, filename);
  
  if (!fs.existsSync(filepath)) {
    throw new Error(`Tool not found: ${lang}/${filename}`);
  }

  // Extract frontmatter fields (everything except body)
  const { body, ...frontmatter } = data;
  
  // Read existing file to preserve order of fields
  const existingContent = fs.readFileSync(filepath, 'utf-8');
  const { data: existingData, content: existingBody } = matter(existingContent);
  
  // Merge: existing frontmatter defaults, then incoming data
  const merged = { ...existingData, ...frontmatter };
  
  // Preserve body if not provided
  const finalBody = body !== undefined ? body : existingBody;
  
  // Write back with matter
  const newContent = matter.stringify(finalBody, merged);
  fs.writeFileSync(filepath, newContent, 'utf-8');
  
  return getTool(lang, filename);
}

export function createTool(lang, data) {
  const dir = getToolsDir(lang);
  
  // Find next number
  const existing = listTools(lang);
  const maxNumber = existing.reduce((max, t) => Math.max(max, t.number || 0), 0);
  const number = data.number || maxNumber + 1;
  
  // Generate filename
  const slug = (data.name || 'new-tool')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  const filename = `${number}-${slug}.md`;
  
  // Build frontmatter
  const frontmatter = {
    number,
    name: data.name || 'Untitled Tool',
    image: data.image || '/assets/images/placeholder.jpg',
    summary: data.summary || '',
    description: data.description || '',
    outcomes: data.outcomes || '',
    instructions: data.instructions || '',
    benefits: data.benefits || '',
    purpose: data.purpose || 'Entrepreneurial Awareness & Sensitization',
    prerequisiteTools: data.prerequisiteTools || '',
    partner: data.partner || 'ACEEU',
    links: data.links || []
  };
  
  const filepath = join(dir, filename);
  const content = matter.stringify(data.body || '', frontmatter);
  fs.writeFileSync(filepath, content, 'utf-8');
  
  return { filename, ...frontmatter, body: data.body || '' };
}

export function deleteTool(lang, filename) {
  const filepath = getToolPath(lang, filename);
  
  if (!fs.existsSync(filepath)) {
    throw new Error(`Tool not found: ${lang}/${filename}`);
  }
  
  fs.unlinkSync(filepath);
  return { deleted: true, filename };
}
