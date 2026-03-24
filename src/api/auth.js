import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { getDb, initDb } from '../lib/db.js';
import { getCurrentUser } from '../lib/auth.js';

const router = Router();

// Initialize DB on first request
initDb();

// Check auth status
router.get('/check', (req, res) => {
  if (req.session && req.session.userId) {
    const user = getCurrentUser(req.session.userId);
    if (user) {
      return res.json({ 
        authenticated: true, 
        user: { id: user.id, username: user.username, role: user.role }
      });
    }
  }
  res.json({ authenticated: false });
});

// Login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }

  const db = getDb();
  const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const valid = bcrypt.compareSync(password, user.password_hash);
  
  if (!valid) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Update last login
  db.prepare('UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?').run(user.id);

  // Set session
  req.session.userId = user.id;
  req.session.username = user.username;
  req.session.role = user.role;

  res.json({ 
    success: true,
    user: { id: user.id, username: user.username, role: user.role }
  });
});

// Logout
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.json({ success: true });
  });
});

// Get current user
router.get('/me', (req, res) => {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const user = getCurrentUser(req.session.userId);
  
  if (!user) {
    return res.status(401).json({ error: 'User not found' });
  }

  res.json({ user });
});

export default router;
