import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { getDb } from '../lib/db.js';

const router = Router();

// List all users
router.get('/', (req, res) => {
  const db = getDb();
  const users = db.prepare('SELECT id, username, email, role, created_at, last_login FROM users ORDER BY created_at DESC').all();
  res.json(users);
});

// Create user
router.post('/', (req, res) => {
  const { username, password, email, role = 'editor' } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }
  
  if (!['admin', 'editor'].includes(role)) {
    return res.status(400).json({ error: 'Invalid role' });
  }

  const db = getDb();
  
  // Check if username exists
  const existing = db.prepare('SELECT id FROM users WHERE username = ?').get(username);
  if (existing) {
    return res.status(400).json({ error: 'Username already exists' });
  }
  
  const hash = bcrypt.hashSync(password, 12);
  
  try {
    const result = db.prepare(`
      INSERT INTO users (username, password_hash, email, role)
      VALUES (?, ?, ?, ?)
    `).run(username, hash, email || null, role);
    
    const user = db.prepare('SELECT id, username, email, role, created_at FROM users WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update user
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { email, role, password } = req.body;
  
  const db = getDb();
  
  // Check user exists
  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  // Build update query
  const updates = [];
  const values = [];
  
  if (email !== undefined) {
    updates.push('email = ?');
    values.push(email || null);
  }
  
  if (role !== undefined) {
    if (!['admin', 'editor'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }
    updates.push('role = ?');
    values.push(role);
  }
  
  if (password) {
    updates.push('password_hash = ?');
    values.push(bcrypt.hashSync(password, 12));
  }
  
  if (updates.length === 0) {
    return res.status(400).json({ error: 'No fields to update' });
  }
  
  values.push(id);
  
  try {
    db.prepare(`UPDATE users SET ${updates.join(', ')} WHERE id = ?`).run(...values);
    const updated = db.prepare('SELECT id, username, email, role, created_at, last_login FROM users WHERE id = ?').get(id);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete user
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  
  // Can't delete yourself
  if (parseInt(id) === req.session.userId) {
    return res.status(400).json({ error: 'Cannot delete yourself' });
  }
  
  const db = getDb();
  
  const user = db.prepare('SELECT id FROM users WHERE id = ?').get(id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  db.prepare('DELETE FROM users WHERE id = ?').run(id);
  res.json({ deleted: true, id });
});

export default router;
