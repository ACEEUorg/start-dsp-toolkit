# Simple File-Based Admin - Implementation Plan

**Goal:** Replace Decap CMS OAuth complexity with a simple self-hosted admin panel  
**Platform:** Uberspace U8 (and local dev)  
**Date:** 2026-03-24

> **Status (2026-08): decommissioned — local use only.** The hosted Uberspace instance
> was shut down and its GitHub deploy key revoked. If content needs editing again, run
> the admin locally: `cd src && npm start` (first time: `npm install` and `npm run seed`),
> edit at `http://localhost:3000/admin`, then commit and push normally. The Uberspace
> deployment sections below are kept for historical reference.

---

## Concept

A lightweight Express server that:
1. Serves simple HTML forms at `/admin`
2. Authenticates editors via SQLite user table
3. Edits existing markdown files directly (same format as now)
4. No external services, no OAuth, no GitHub dependency

---

## Architecture

```
┌─────────────────────────────────────────┐
│              Browser                     │
│  /admin → Login form                    │
│  /admin/tools → List of tools            │
│  /admin/tools/:lang/:id → Edit form      │
└────────────────────┬────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────┐
│         Express Server (localhost)       │
│                                          │
│  Auth middleware (session + bcrypt)      │
│         │                               │
│  ┌──────┴───────┐                       │
│  │              │                       │
│  ▼              ▼                       │
│ /admin/*    /api/*                      │
│ (HTML forms) (JSON responses)            │
└────────────────────┬────────────────────┘
                     │
       ┌─────────────┼─────────────┐
       ▼             ▼             ▼
┌──────────┐  ┌──────────┐  ┌──────────┐
│ SQLite   │  │ Markdown  │  │  Media   │
│ users.db │  │   files   │  │  assets  │
└──────────┘  └──────────┘  └──────────┘
```

---

## Tech Stack

| Component | Package | Purpose |
|-----------|---------|---------|
| Server | Express 5 | Web framework |
| Auth | express-session + bcryptjs | Session + password hashing |
| Database | better-sqlite3 | SQLite (U8 compatible, no build) |
| Frontmatter | gray-matter | Parse/edit YAML frontmatter |
| YAML | js-yaml | Safe YAML serialization |
| Dev | Vite | Serve admin UI (dev only) |

**No Docker, no external services, no npm native modules that need compilation.**

---

## File Structure

```
src/
├── admin/
│   ├── index.js           # Admin routes + HTML forms
│   └── forms/
│       ├── login.html
│       ├── tools-list.html
│       └── tool-edit.html
├── api/
│   ├── auth.js            # Login/logout endpoints
│   ├── tools.js           # Tool CRUD endpoints
│   ├── users.js           # User management (admin only)
│   └── sync.js            # GitHub sync endpoint
├── lib/
│   ├── db.js              # SQLite setup
│   ├── auth.js            # Auth middleware
│   └── files.js           # Markdown file read/write
├── index.js               # Entry point
data/
├── users.db               # SQLite database
└── sessions/              # Session files if needed
```

## GitHub Sync Feature

The admin includes a "Push to GitHub" button that:
1. Commits all changes to the markdown files
2. Pushes to the remote repository
3. Triggers your existing GitHub Actions workflow to rebuild and deploy

**Requirements:**
- The server must have SSH access to the GitHub repo OR a GitHub token
- For SSH: Add deploy key to GitHub repo
- For token: Set `GITHUB_TOKEN` in `.env`

**Using GitHub Token (recommended for simplicity):**

```bash
# .env on server
GITHUB_TOKEN=ghp_your_personal_access_token
```

Create token at: GitHub → Settings → Developer settings → Personal access tokens
Required scope: `repo` (full control of private repositories)

---

## Database Schema

```sql
-- Users table
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    email TEXT,
    role TEXT DEFAULT 'editor',  -- 'admin' or 'editor'
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_login DATETIME
);
```

---

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/auth/check` | Check if logged in |
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/logout` | Logout |

### Tools

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tools` | List all tools (by language) |
| GET | `/api/tools/:lang` | List tools for language |
| GET | `/api/tools/:lang/:id` | Get single tool |
| PUT | `/api/tools/:lang/:id` | Update tool (writes markdown) |
| POST | `/api/tools/:lang` | Create new tool |

### Users (admin only)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | List users |
| POST | `/api/users` | Create user |
| PUT | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Delete user |

### Sync

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/sync` | Commit and push changes to GitHub |

---

## Frontmatter Format (Preserved)

Existing markdown files stay in same format:

```markdown
---
number: 1
name: The Entrepreneurial Wall Pack
image: /assets/images/1.jpg
summary: Brief description...
description: |
  Full description...
outcomes: |
  Outcomes...
instructions: |
  Steps...
benefits: Benefits text
purpose: Entrepreneurial Awareness & Sensitization
prerequisiteTools: |
  1. Another tool
partner: ACEEU
links:
  - title: "Download"
    url: /assets/tools/en/file.pdf
---
```

---

## Admin UI Screens

### 1. Login (`/admin/login`)
- Username + password fields
- Simple, no branding
- Error messages inline

### 2. Tools List (`/admin/tools`)
- Tabs for each language (EN, ES, DE, EL)
- Table: Number, Name, Purpose
- "Edit" button per row
- "Create New" button

### 3. Tool Editor (`/admin/tools/:lang/:id`)
- All frontmatter fields as form inputs
- Preview of markdown below
- Save / Cancel buttons
- Delete (with confirmation)

### 4. User Management (`/admin/users`) - Admin only
- List users
- Add/Edit/Delete users
- Reset password

---

## Development vs Production

### Development
```bash
npm run dev
# Vite dev server on :5173
# Express API on :3000
# Proxies API → Express
```

### Production (Uberspace)
```bash
npm run build  # Bundles admin UI
npm start      # Express only, serves built admin + API
```

---

## Implementation Steps

- [ ] 1. Set up Express + basic routes
- [ ] 2. Configure SQLite with better-sqlite3
- [ ] 3. Implement auth (login/logout/session)
- [ ] 4. Create seed script (first admin user)
- [ ] 5. Build tool list endpoint
- [ ] 6. Build tool read/write (markdown files)
- [ ] 7. Create login HTML form
- [ ] 8. Create tools list HTML
- [ ] 9. Create tool editor HTML form
- [ ] 10. Add user management
- [ ] 11. Test full flow
- [ ] 12. Add rate limiting

---

## Uberspace U8 Deployment

### Prerequisites
- GitHub repo with the admin code pushed
- Domain subdomain ready (e.g. `admin.yourdomain.com`)

### Step 1: Clone repo on Uberspace

```bash
# SSH in
ssh isabell@your-asteroid.uberspace.de

# Clone the repo (use your actual repo URL)
git clone https://github.com/ACEEUorg/start-dsp-toolkit.git ~/start-dsp-toolkit
cd ~/start-dsp-toolkit

# Navigate to admin source
cd src
```

### Step 2: Install dependencies

```bash
# Install production dependencies
npm install --only=production
```

### Step 3: Configure environment

```bash
# Create .env file
cat > .env << 'EOF'
SESSION_SECRET=generate_a_long_random_string_here
NODE_ENV=production
GITHUB_TOKEN=ghp_your_github_personal_access_token
EOF
```

### Step 4: Create systemd service

```bash
# Create service directory
mkdir -p ~/.config/systemd/user

# Create service file
cat > ~/.config/systemd/user/simple-admin.service << 'EOF'
[Unit]
Description=Simple Admin Server
After=network.target

[Service]
Type=simple
WorkingDirectory=%h/start-dsp-toolkit/src
ExecStart=%h/.nvm/versions/node/v22.21.0/bin/node index.js
Restart=on-failure
RestartSec=5
Environment=NODE_ENV=production
EnvironmentFile=%h/start-dsp-toolkit/src/.env
StandardOutput=append:%h/start-dsp-toolkit/src/logs/app.log
StandardError=append:%h/start-dsp-toolkit/src/logs/error.log

[Install]
WantedBy=default.target
EOF

# Check Node.js path
which node
# Update ExecStart path in service file if different
```

### Step 5: Create log directory

```bash
mkdir -p ~/start-dsp-toolkit/src/logs
```

### Step 6: Configure web backend

```bash
# Add subdomain (replace with your domain)
uberspace web domain add admin.yourdomain.com

# Set backend to proxy to Express on port 3000
uberspace web backend set admin.yourdomain.com --http --port 3000

# SSL is automatic via Caddy
```

### Step 7: Create admin user

```bash
cd ~/start-dsp-toolkit/src
node scripts/seed-admin.js
```

### Step 8: Start service

```bash
# Reload systemd
systemctl --user daemon-reload

# Enable and start
systemctl --user enable --now simple-admin

# Check status
systemctl --user status simple-admin

# View logs
journalctl --user-unit simple-admin -f
```

### Updating

```bash
# Pull latest code
cd ~/start-dsp-toolkit
git pull

# Restart service
systemctl --user restart simple-admin
```

---

## Complexity Estimate

| Component | Complexity |
|-----------|------------|
| Express + routes | Low |
| SQLite setup | Low |
| Auth (bcrypt + session) | Low |
| Markdown read/write | Low |
| Admin HTML forms | Low |
| User management | Low |
| Rate limiting | Low |
| **Total** | **~8-12 hours** |

This is the "right-sized" solution: builds exactly what you need, no more.
