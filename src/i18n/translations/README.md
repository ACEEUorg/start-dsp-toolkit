# UI Translations

This directory contains both source YAML files and generated JavaScript files for UI translations.

## Architecture

- **Source Files**: `*.yml` - Edited via admin panel or directly
- **Generated Files**: `*.js` - Auto-generated from YAML, imported by the application

## Workflow

1. **Edit translations** in admin panel (or edit YAML files directly)
2. **YAML files are saved** to this directory (`en.yml`, `es.yml`, etc.)
3. **Run build script** to generate JavaScript files:
   ```bash
   npm run generate-translations
   ```
4. **JavaScript files are generated** and imported by the application

## Development

The generation happens automatically:
- During `npm run dev` (before starting dev server)
- During `npm run build` (before production build)
- During GitHub Actions deployment

## Adding New Languages

1. Create a new `{lang}.yml` file
2. Add the language code to `scripts/generate-translations-js.js`
3. Import the generated file in `src/i18n/I18nContext.jsx`
4. Add the language option to the language selector

## Translation Keys

All translation keys use dot notation:
- `header.title` - Main header title
- `nav.toolbox` - Navigation items
- `toolDetail.*` - Tool detail page strings
- `badge.*` - Badge labels
- `cookie.*` - Cookie consent strings
- `footer.*` - Footer content
- `language.*` - Language names
- `notFound.*` - 404 page content

## File Format

YAML files use simple key-value pairs:
```yaml
header.title: "Start-DSP Entrepreneurial University Toolbox"
nav.toolbox: "Toolbox"
```

Generated JavaScript files export a default object:
```javascript
export default {
  "header.title": "Start-DSP Entrepreneurial University Toolbox",
  "nav.toolbox": "Toolbox"
};
```
