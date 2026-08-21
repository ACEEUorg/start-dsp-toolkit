# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo contains

Two separate applications that share one content directory:

1. **Public site** (repo root) — React 19 + Vite 7 static site, deployed to GitHub Pages at `toolbox.start-dsp.eu`. Root `package.json`.
2. **Admin panel** (`src/index.js` + `src/api/`, `src/lib/`, `src/admin/`) — a self-hosted Express 5 server with its own `src/package.json` and its own `node_modules`. Not part of the Vite build; run it locally when content needs editing — see `docs/simple-admin-plan.md` (the formerly hosted instance was decommissioned).

They are linked by `content/tools/{lang}/*.md`: the admin writes those files, the build reads them.

## Commands

Public site (from repo root):

```bash
npm install
npm run dev        # runs `generate` first, then vite on :5173
npm run build      # runs `generate` first, then vite build → dist/
npm run generate   # generate-translations + generate-tools
npm run lint       # eslint .
npm run preview
```

Admin panel (from `src/`, separate dependency tree):

```bash
cd src && npm install
node scripts/seed-admin.js   # create the first admin user (writes ../data/users.db)
npm start                    # express on :3000, admin UI at /admin
npm run dev                  # same with node --watch
```

There is no test framework in this repo — no test script, no test files.

## Build pipeline (important)

Both of the site's data sources are **generated and gitignored**. A fresh clone has no `public/data/` and no `src/i18n/translations/*.js`; `npm run dev`/`build` regenerate them, but anything else (e.g. running `vite` directly) will fail on missing imports.

**Tool content:**
`content/tools/{en,es,de,el}/NN-slug.md` (YAML frontmatter; markdown body is not rendered by the site)
→ `scripts/generate-tools-json.js`
→ `public/data/tools-{lang}.json` (`{tools: [...], validOptions: {purpose: [...]}}`)
→ fetched at runtime by `src/data/tools/index.js` via `${BASE_URL}data/tools-{lang}.json`, falling back to `en` on failure.

Frontmatter fields: `number`, `name`, `image`, `summary`, `description`, `outcomes`, `instructions`, `benefits`, `purpose`, `prerequisiteTools`, `partner`, `links[{title,url}]`. `purpose` is the only filter facet, and its dropdown options are derived from the per-language files — so purpose strings must match exactly across tools within a language.

**UI strings:**
`src/i18n/translations/{lang}.yml` → `scripts/generate-translations-js.js` → `{lang}.js` → imported statically by `src/i18n/I18nContext.jsx`. Edit the `.yml`, never the `.js`. Adding a language requires touching `scripts/generate-translations-js.js`, `I18nContext.jsx`, `LanguageSelector.jsx`, and the language arrays in `scripts/generate-tools-json.js`, `src/lib/files.js`, `src/api/tools.js`, `src/api/translations.js`.

**Two copies of the tools generator exist:** `scripts/generate-tools-json.js` (build-time) and `src/scripts/generate-tools-json.js` (spawned by the admin after every tool write). They have drifted — only the root one decodes HTML entities and appends trailing punctuation to `summary`/`description`. Changes to generation logic must be applied to both, or admin-saved JSON will differ from CI-built JSON.

## Frontend architecture

- **HashRouter**, and Vite is configured `appType: "mpa"` (SPA fallback deliberately disabled) so GitHub Pages can serve `/admin/` as a real path. Routes: `/`, `/toolbox`, `/tool/:number`, `*`.
- `src/main.jsx` skips mounting React entirely when `location.pathname` starts with `/admin`.
- `base` comes from `VITE_BASE_PATH`; the deploy workflow sets it to `/` for the canonical `ACEEUorg/start-dsp-toolkit` repo and `/start-dsp-toolkit/` for forks. Anything referencing built assets must go through `import.meta.env.BASE_URL`.
- Language lives in `I18nContext` (localStorage + browser detection, `en`/`es`/`de`/`el`); `t(key)` uses flat dot-notation keys with English fallback. Changing language reloads the tools JSON and clears search/filter state, because `purpose` values are language-specific.
- **Image fallbacks are runtime, not build-time.** `ToolImage.jsx` walks `.jpg → .jpeg → .png` before falling back to a placeholder, so a missing image extension is a normal, handled state — don't "fix" it by editing frontmatter URLs.
- **Every tool material lives on Skills-Lab**, linked from frontmatter as `https://www.skills-lab.eu/index/{downloadmaterialfile|materialfilevisit}/projectId/49/materialFileId/NN`. Both routes count as a download there, and each language points at its own file id, so these links are already localized. `src/utils/toolLinks.js` is the single place that reasons about them: `isSkillsLabMaterialUrl` (either route), `getDownloadBadgeUrl` (the `/badge/file/NN.svg` download counter — SVG, since its width tracks the digit count), and `getLinkFileType`. There are no local PDFs; a link that is external but *not* Skills-Lab is a third-party site, and `EnglishOnlyBadge` labels it English-only on the non-English sites. A single Skills-Lab material that exists in English only is marked per link with `englishOnly: true` in frontmatter.
- Tailwind v4 with CSS-first config: all design tokens are in the `@theme` block of `src/index.css` (`grass`, `aqua`, `mandarine`, and `seafoam` — the primary brand ramp — plus `font-sans: Avenir` / `font-display: Nexa`). There is no `tailwind.config.js`.

## Admin panel architecture

- Auth: `express-session` cookie + bcrypt, SQLite via `better-sqlite3` at `data/users.db` (repo root, gitignored). Tables: `users`, `password_reset_tokens`, `audit_logs`.
- Two authorization layers: `role` (`admin` | `editor`) and a per-user `permissions` JSON column holding `{languages: [...], canEditTranslations: bool}`. Admins bypass both. `requireLanguagePermission` in `src/api/tools.js` allows GET for any authenticated user but gates writes on the language in the URL.
- HTML routes and API routes are guarded separately: `requireAuthHtml`/`requireRoleHtml` in `src/index.js` redirect to `/admin`, while `requireAuth`/`requireRole` return JSON 401/403.
- The UI is plain HTML + inline JS in `src/admin/forms/*.html` (no build step, no framework); each page calls same-origin `/api/*` endpoints.
- Tool writes go through `gray-matter` (`src/lib/files.js`), which merges into existing frontmatter and preserves the markdown body when the request omits it. Every create/update/delete then re-runs the tools generator and writes an audit log row.
- `POST /api/sync` (admin role only) shells out to `git add -A && git commit && git push origin main` in `process.cwd()`. That push is what triggers the deploy — commits titled `Update content from admin (<user>)` in the history come from this path, not from a human.

## Deployment

`.github/workflows/deploy.yml` builds on push to `main` and publishes `dist/` to GitHub Pages. `VITE_GA4_MEASUREMENT_ID` comes from repo secrets; analytics (`src/utils/analytics.js`) and the cookie-consent gate depend on it. `CNAME` pins the custom domain.

## Misc

- `src/data/input.csv` is the retired CSV source from before the markdown migration; nothing in the build reads it.
- `ltrs-check.pl` is an ad-hoc LanguageTool grammar checker for a JSON file (needs `LT_API_KEY` in the environment), and `cmp.sh` bulk-compresses oversized images with ImageMagick. Neither is wired into the build.
