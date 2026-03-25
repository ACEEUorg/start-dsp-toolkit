import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { Resend } from 'resend';
import { getDb, logAudit } from '../lib/db.js';
import { requireAuth, requireRole } from '../lib/auth.js';

const router = Router();
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Get current user info (including permissions)
router.get('/me', requireAuth, (req, res) => {
  const db = getDb();
  const user = db.prepare('SELECT id, username, email, role, permissions, created_at, last_login FROM users WHERE id = ?').get(req.session.userId);
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  user.permissions = user.permissions ? JSON.parse(user.permissions) : {};
  res.json(user);
});

// List all users (admin only)
router.get('/', requireRole('admin'), (req, res) => {
  const db = getDb();
  const users = db.prepare('SELECT id, username, email, role, permissions, created_at, last_login FROM users ORDER BY created_at DESC').all();
  
  // Parse permissions JSON for each user
  const result = users.map(u => ({
    ...u,
    permissions: u.permissions ? JSON.parse(u.permissions) : {}
  }));
  
  res.json(result);
});

// Create user
router.post('/', requireRole('admin'), async (req, res) => {
  const { username, password, email, role = 'editor', permissions = {} } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }
  
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
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
  const permissionsJson = JSON.stringify(permissions);
  
  try {
    const result = db.prepare(`
      INSERT INTO users (username, password_hash, email, role, permissions)
      VALUES (?, ?, ?, ?, ?)
    `).run(username, hash, email, role, permissionsJson);
    
    const user = db.prepare('SELECT id, username, email, role, permissions, created_at FROM users WHERE id = ?').get(result.lastInsertRowid);
    user.permissions = permissions;
    
    // Send welcome email
    if (!resend) {
      console.log('Welcome email (not sent - no API key):', { username, password });
    } else {
      try {
        await resend.emails.send({
          from: 'Start-DSP Toolkit <hi@jel.do>',
          to: email,
          subject: 'Your Start-DSP Toolkit account has been created',
          html: `
            <p>Hi ${username},</p>
            <p>Your account has been created for the Start-DSP Toolkit admin panel.</p>
            <p><strong>Username:</strong> ${username}</p>
            <p><strong>Temporary Password:</strong> ${password}</p>
            <p>Please log in at <a href="https://sdsp.jel.do/admin">sdsp.jel.do/admin</a> and change your password.</p>
          `
        });
      } catch (err) {
        console.error('Failed to send welcome email:', err);
      }
    }
    
    logAudit(req.session.userId, req.session.username, 'create_user', username, `role: ${role}`);
    
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update user
router.put('/:id', requireRole('admin'), (req, res) => {
  const { id } = req.params;
  const { email, role, password, permissions } = req.body;
  
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
  
  if (permissions !== undefined) {
    updates.push('permissions = ?');
    values.push(JSON.stringify(permissions));
  }
  
  if (updates.length === 0) {
    return res.status(400).json({ error: 'No fields to update' });
  }
  
  values.push(id);
  
  try {
    db.prepare(`UPDATE users SET ${updates.join(', ')} WHERE id = ?`).run(...values);
    const updated = db.prepare('SELECT id, username, email, role, permissions, created_at, last_login FROM users WHERE id = ?').get(id);
    updated.permissions = updated.permissions ? JSON.parse(updated.permissions) : {};
    logAudit(req.session.userId, req.session.username, 'update_user', updated.username, updates.join(', '));
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete user
router.delete('/:id', requireRole('admin'), (req, res) => {
  const { id } = req.params;
  
  // Can't delete yourself
  if (parseInt(id) === req.session.userId) {
    return res.status(400).json({ error: 'Cannot delete yourself' });
  }
  
  const db = getDb();
  
  const user = db.prepare('SELECT id, username FROM users WHERE id = ?').get(id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  db.prepare('DELETE FROM users WHERE id = ?').run(id);
  logAudit(req.session.userId, req.session.username, 'delete_user', user.username, '');
  res.json({ deleted: true, id });
});

// Get audit logs (admin only)
router.get('/audit-logs', requireRole('admin'), (req, res) => {
  const db = getDb();
  const logs = db.prepare(`
    SELECT * FROM audit_logs ORDER BY created_at DESC LIMIT 100
  `).all();
  res.json(logs);
});

export default router;
