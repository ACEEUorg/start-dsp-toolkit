#!/usr/bin/env node
/**
 * Pre-build script to generate JavaScript translation files from YAML.
 * The admin panel edits YAML files while the app uses JS modules.
 */

import { load } from "js-yaml";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = join(__dirname, "..");
const TRANSLATIONS_DIR = join(ROOT_DIR, "src/i18n/translations");

const LANGUAGES = ["en", "es", "de", "el"];

const LANGUAGE_NAMES = {
  en: "English (EN)",
  es: "Spanish (ES)",
  de: "German (DE)",
  el: "Greek (EL)",
};

/**
 * Convert YAML translation file to JavaScript module
 */
function generateJsFromYaml(language) {
  const ymlPath = join(TRANSLATIONS_DIR, `${language}.yml`);
  const jsPath = join(TRANSLATIONS_DIR, `${language}.js`);

  if (!existsSync(ymlPath)) {
    console.warn(`Warning: YAML file not found: ${ymlPath}`);
    return false;
  }

  // Read and parse YAML
  const yamlContent = readFileSync(ymlPath, "utf8");
  const translations = load(yamlContent) || {};

  // Generate JavaScript file with proper formatting
  const jsContent = `/**
 * ${LANGUAGE_NAMES[language]} UI Translations
 * Start-DSP Entrepreneurial University Toolbox
 *
 * INSTRUCTIONS FOR TRANSLATORS:
 * - Translate all values (the text after the colon)
 * - Keep all keys (the text before the colon) unchanged
 * - Preserve HTML-like formatting if present
 * - Test that translations fit in the UI
 */

export default ${JSON.stringify(translations, null, 2)};
`;

  writeFileSync(jsPath, jsContent, "utf8");
  return true;
}

/**
 * Main build function
 */
function main() {
  console.log("Generating translation JavaScript files from YAML...\n");

  let successCount = 0;
  for (const lang of LANGUAGES) {
    if (generateJsFromYaml(lang)) {
      console.log(`  ✓ ${lang}: Generated ${lang}.js from ${lang}.yml`);
      successCount++;
    } else {
      console.log(`  ✗ ${lang}: Failed to generate`);
    }
  }

  console.log(`\nDone! Generated ${successCount}/${LANGUAGES.length} files`);
}

main();
