# Start-DSP Entrepreneurial University Toolbox

React web app for the Start-DSP Entrepreneurial University Toolbox — a catalog of 24 entrepreneurship-education tools for universities and educators, available in English, Spanish, German and Greek. Live at <https://toolbox.start-dsp.eu>.

## Getting Started

```bash
npm install
npm run dev        # generates data files, then starts Vite on http://localhost:5173
```

Node ≥ 20.19 is required (Vite 7); Node 22 LTS recommended. There is no test suite.

## Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Generate data + start dev server with HMR |
| `npm run build` | Generate data + production build to `dist/` |
| `npm run generate` | Regenerate all data files (translations + tools) |
| `npm run generate-translations` | YAML → JS translation modules |
| `npm run generate-tools` | Markdown frontmatter → JSON tool data |
| `npm run lint` | ESLint |
| `npm run preview` | Preview the production build |

## Content Pipeline

The source of truth is markdown + YAML. Generated files are gitignored and rebuilt on every dev/build/CI run — **edit the sources, never the generated files**:

- `content/tools/{en,es,de,el}/NN-slug.md` — one file per tool; all data lives in the YAML frontmatter (fields: `number`, `name`, `image`, `summary`, `description`, `outcomes`, `instructions`, `benefits`, `purpose`, `prerequisiteTools`, `partner`, `links`). Built by `scripts/generate-tools-json.js` into `public/data/tools-{lang}.json`, which the app fetches at runtime (with English fallback).
- `src/i18n/translations/{lang}.yml` — UI strings. Built by `scripts/generate-translations-js.js` into `{lang}.js` modules that are bundled into the app.

`purpose` is the filter facet on the catalog page; its dropdown options are derived from the tool files, so the string must match exactly across tools within a language.

## Editing Content (Admin Panel)

A small Express 5 + SQLite admin app lives in `src/` (own `package.json`, own `node_modules`). It edits the markdown/YAML sources through a browser UI with users, roles and per-language permissions:

```bash
cd src
npm install
npm run seed       # first time only: create the initial admin user
npm start          # http://localhost:3000/admin
```

Publishing means committing and pushing the changed source files. The formerly hosted admin instance is decommissioned — the admin is for local use only. Details in `docs/simple-admin-plan.md`.

## Tech Stack

- **React 19** + **Vite 7** (MPA mode with HashRouter for GitHub Pages)
- **Tailwind CSS v4** — design tokens in the `@theme` block of `src/index.css` (color ramps `grass`, `aqua`, `mandarine`, and `seafoam` as primary brand color; fonts Avenir/Nexa)
- **React Router 7**, Headless UI, Heroicons, Lucide
- Custom i18n context: browser-language detection, localStorage persistence, English fallback
- GA4 analytics behind a cookie-consent banner

## Routes

- `/` and `/toolbox` — catalog with text search and purpose filter (state persisted in URL params)
- `/tool/:number` — tool detail page with downloadable resources
- URLs are hash-based (`/#/tool/5`) for GitHub Pages compatibility

## Static Assets

- **Tool materials**: hosted on Skills-Lab, not in this repo. Each tool's frontmatter links to `https://www.skills-lab.eu/index/{downloadmaterialfile|materialfilevisit}/projectId/49/materialFileId/NN`, with a separate file id per language, and the detail page shows the Skills-Lab download counter underneath each such link.
- **Images**: `public/assets/images/{number}.jpg`, tried as `.jpg` → `.jpeg` → `.png`, then a generated placeholder.

## Deployment

Every push to `main` triggers `.github/workflows/deploy.yml`: `npm ci` + `npm run build`, then `dist/` is published to GitHub Pages under the custom domain `toolbox.start-dsp.eu` (`CNAME`). Forks build with `/start-dsp-toolkit/` as base path automatically (`VITE_BASE_PATH`). The GA4 measurement id comes from the `VITE_GA4_MEASUREMENT_ID` repository secret.
