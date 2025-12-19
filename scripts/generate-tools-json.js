#!/usr/bin/env node
/**
 * Pre-build script to generate JSON files from markdown tool content.
 * This runs during build to avoid runtime parsing overhead.
 */

import { load } from "js-yaml";
import {
  readFileSync,
  writeFileSync,
  readdirSync,
  mkdirSync,
  existsSync,
} from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = join(__dirname, "..");
const CONTENT_DIR = join(ROOT_DIR, "content/tools");
const OUTPUT_DIR = join(ROOT_DIR, "public/data");

const LANGUAGES = ["en", "es", "de", "el"];

/**
 * Parse YAML frontmatter from markdown content
 */
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return {};
  }

  const yamlContent = match[1];
  const data = load(yamlContent) || {};

  // Ensure summary ends with punctuation
  if (data.summary && typeof data.summary === "string") {
    const lastChar = data.summary.slice(-1);
    if (![".", "!", "?"].includes(lastChar)) {
      data.summary = data.summary + ".";
    }
  }

  // Ensure description ends with punctuation
  if (data.description && typeof data.description === "string") {
    const trimmed = data.description.trim();
    const lastChar = trimmed.slice(-1);
    if (![".", "!", "?"].includes(lastChar)) {
      data.description = trimmed + ".";
    } else {
      data.description = trimmed;
    }
  }

  return data;
}

/**
 * Load all tools for a specific language
 */
function loadToolsForLanguage(language) {
  const langDir = join(CONTENT_DIR, language);

  if (!existsSync(langDir)) {
    console.warn(`Warning: Language directory not found: ${langDir}`);
    return { tools: [], validOptions: { purpose: [] } };
  }

  const files = readdirSync(langDir).filter((f) => f.endsWith(".md"));
  const tools = [];
  const purposes = new Set();

  for (const file of files) {
    const filePath = join(langDir, file);
    const content = readFileSync(filePath, "utf8");
    const data = parseFrontmatter(content);

    if (Object.keys(data).length > 0) {
      tools.push(data);
      if (data.purpose) {
        purposes.add(data.purpose);
      }
    }
  }

  // Sort tools by number
  tools.sort((a, b) => (a.number || 0) - (b.number || 0));

  return {
    tools,
    validOptions: {
      purpose: Array.from(purposes).sort(),
    },
  };
}

/**
 * Main build function
 */
function main() {
  console.log("Generating tools JSON files...\n");

  // Ensure output directory exists
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  for (const lang of LANGUAGES) {
    const data = loadToolsForLanguage(lang);
    const outputPath = join(OUTPUT_DIR, `tools-${lang}.json`);

    writeFileSync(outputPath, JSON.stringify(data, null, 2));
    console.log(`  ✓ ${lang}: ${data.tools.length} tools → ${outputPath}`);
  }

  console.log("\nDone!");
}

main();
