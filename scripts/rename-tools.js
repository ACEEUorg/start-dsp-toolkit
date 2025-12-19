#!/usr/bin/env node
/**
 * Rename tool markdown files to use slugified names based on the tool name.
 * Format: {number}-{slugified-name}.md
 */

import { readFileSync, renameSync, readdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = join(__dirname, "..");
const CONTENT_DIR = join(ROOT_DIR, "content/tools");

const LANGUAGES = ["en", "es", "de", "el"];

/**
 * Convert a string to a URL-friendly slug
 */
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/['"":&]/g, '')           // Remove quotes, colons, ampersands
    .replace(/[^\w\s-]/g, '')          // Remove non-word chars except spaces and hyphens
    .replace(/\s+/g, '-')              // Replace spaces with hyphens
    .replace(/-+/g, '-')               // Replace multiple hyphens with single
    .replace(/^-+|-+$/g, '')           // Trim hyphens from start/end
    .substring(0, 50);                  // Limit length
}

/**
 * Extract tool name from markdown frontmatter
 */
function getToolName(content) {
  const match = content.match(/^name:\s*["']?(.+?)["']?\s*$/m);
  return match ? match[1].trim() : null;
}

/**
 * Extract tool number from markdown frontmatter
 */
function getToolNumber(content) {
  const match = content.match(/^number:\s*(\d+)/m);
  return match ? parseInt(match[1], 10) : null;
}

/**
 * Main function
 */
function main() {
  console.log("Renaming tool files to use slugified names...\n");

  // First, get the names from English files (source of truth)
  const enDir = join(CONTENT_DIR, "en");
  const toolNames = new Map();

  for (const file of readdirSync(enDir).filter(f => f.endsWith(".md"))) {
    const content = readFileSync(join(enDir, file), "utf8");
    const number = getToolNumber(content);
    const name = getToolName(content);

    if (number && name) {
      const slug = slugify(name);
      const paddedNum = String(number).padStart(2, "0");
      const newFilename = `${paddedNum}-${slug}.md`;
      toolNames.set(number, { name, slug, newFilename });
      console.log(`  Tool ${number}: "${name}" → ${newFilename}`);
    }
  }

  console.log("\nRenaming files in all languages...\n");

  for (const lang of LANGUAGES) {
    const langDir = join(CONTENT_DIR, lang);

    if (!existsSync(langDir)) {
      console.log(`  Skipping ${lang} (directory not found)`);
      continue;
    }

    console.log(`  ${lang}:`);

    for (const file of readdirSync(langDir).filter(f => f.endsWith(".md"))) {
      const filePath = join(langDir, file);
      const content = readFileSync(filePath, "utf8");
      const number = getToolNumber(content);

      if (number && toolNames.has(number)) {
        const { newFilename } = toolNames.get(number);
        const newPath = join(langDir, newFilename);

        if (file !== newFilename) {
          renameSync(filePath, newPath);
          console.log(`    ${file} → ${newFilename}`);
        } else {
          console.log(`    ${file} (already correct)`);
        }
      }
    }
  }

  console.log("\nDone!");
}

main();
