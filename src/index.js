import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { initDb } from './lib/db.js';
import { requireAuth, requireRole } from './lib/auth.js';
import authRoutes from './api/auth.js';
import toolsRoutes from './api/tools.js';
import usersRoutes from './api/users.js';
import syncRoutes from './api/sync.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const ADMIN_FORMS = join(__dirname, 'admin', 'forms');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize database
initDb();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: true,
  credentials: true
}));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'dev-secret-change-in-production',
  resave: false,
  saveUninitialized: false,
  proxy: true, // Trust the reverse proxy (Caddy)
  cookie: {
    secure: true,
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  }
}));

// Static files (admin UI)
app.use('/admin', express.static(ADMIN_FORMS));

// Serve preview frontend from dist/
app.use(express.static(join(ROOT, 'dist')));

// Serve public assets (images, PDFs, etc)
app.use('/assets', express.static(join(ROOT, 'public', 'assets')));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/tools', requireAuth, toolsRoutes);
app.use('/api/users', requireAuth, requireRole('admin'), usersRoutes);
app.use('/api/sync', requireAuth, syncRoutes);

// Admin routes (HTML pages)
app.get('/admin', (req, res) => {
  if (req.session.userId) {
    res.redirect('/admin/tools');
  } else {
    res.sendFile(join(ADMIN_FORMS, 'login.html'));
  }
});

app.get('/admin/tools', requireAuth, (req, res) => {
  res.sendFile(join(ADMIN_FORMS, 'tools-list.html'));
});

app.get('/admin/tools/:lang/:id', requireAuth, (req, res) => {
  res.sendFile(join(ADMIN_FORMS, 'tool-edit.html'));
});

app.get('/admin/users', requireAuth, requireRole('admin'), (req, res) => {
  res.sendFile(join(ADMIN_FORMS, 'users.html'));
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Simple Admin running at http://localhost:${PORT}/admin`);
  console.log(`\nFirst time? Run: node src/scripts/seed-admin.js`);
});
