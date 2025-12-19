#!/usr/bin/env node

/**
 * Convert tools from JSON format to markdown frontmatter
 *
 * Usage: node scripts/convert-tools-to-markdown.js
 */

import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");

const languages = ["en", "es", "de", "el"];

// Tool number to folder name mapping
const getToolFolderName = (number) => {
  const paddedNumber = String(number).padStart(2, "0");
  // We'll need to create proper folder names - for now just use the number
  return `${paddedNumber}-tool-${number}`;
};

// Convert a tool object to markdown frontmatter
function toolToMarkdown(tool) {
  const lines = ["---"];

  // Add each field
  for (const [key, value] of Object.entries(tool)) {
    if (value === undefined || value === null) continue;

    if (Array.isArray(value)) {
      // Handle arrays (like links)
      lines.push(`${key}:`);
      for (const item of value) {
        if (typeof item === "object") {
          lines.push(
            `  - ${Object.entries(item)
              .map(([k, v]) => `${k}: "${v}"`)
              .join("\n    ")}`,
          );
        } else {
          lines.push(`  - ${item}`);
        }
      }
    } else if (typeof value === "string" && value.includes("\n")) {
      // Multiline string
      lines.push(`${key}: |`);
      value.split("\n").forEach((line) => {
        lines.push(`  ${line}`);
      });
    } else if (typeof value === "string" && value.includes(":")) {
      // Quote strings with colons (but don't double-escape quotes)
      lines.push(`${key}: "${value}"`);
    } else {
      // Simple value
      lines.push(`${key}: ${value}`);
    }
  }

  lines.push("---");
  return lines.join("\n") + "\n";
}

// Main conversion function
function convertTools() {
  console.log("Converting tools from JSON to Markdown...\n");

  for (const lang of languages) {
    const jsonPath = join(rootDir, `src/data/tools/languages/${lang}.json`);
    console.log(`Processing ${lang}.json...`);

    try {
      const jsonContent = readFileSync(jsonPath, "utf-8");
      const data = JSON.parse(jsonContent);

      console.log(`  Found ${data.tools.length} tools`);

      for (const tool of data.tools) {
        const folderName = getToolFolderName(tool.number);
        const toolDir = join(rootDir, `content/tools/${folderName}`);

        // Create directory if it doesn't exist
        mkdirSync(toolDir, { recursive: true });

        // Skip Tool #1 as it already exists
        if (tool.number === 1) {
          console.log(`  Skipping Tool #${tool.number} (already exists)`);
          continue;
        }

        // Write markdown file
        const mdPath = join(toolDir, `${lang}.md`);
        const markdown = toolToMarkdown(tool);
        writeFileSync(mdPath, markdown, "utf-8");

        console.log(`  Created ${folderName}/${lang}.md`);
      }
    } catch (error) {
      console.error(`  Error processing ${lang}.json:`, error.message);
    }
  }

  console.log("\nConversion complete!");
}

convertTools();
