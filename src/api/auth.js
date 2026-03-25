import { Router } from 'express';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import rateLimit from 'express-rate-limit';
import { Resend } from 'resend';
import { getDb, initDb } from '../lib/db.js';
import { getCurrentUser } from '../lib/auth.js';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const router = Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window
  message: { error: 'Too many login attempts. Please try again in 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

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

// Login (rate limited)
router.post('/login', loginLimiter, (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username or email and password required' });
  }

  const db = getDb();
  let user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
  
  if (!user) {
    user = db.prepare('SELECT * FROM users WHERE email = ?').get(username);
  }

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

// Request password reset
router.post('/reset-request', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email required' });
  }

  const db = getDb();
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);

  if (!user) {
    return res.json({ message: 'If an account with that email exists, a reset link has been sent.' });
  }

  // Generate token
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString(); // 1 hour

  // Delete old tokens for this user
  db.prepare('DELETE FROM password_reset_tokens WHERE user_id = ?').run(user.id);

  // Store new token
  db.prepare('INSERT INTO password_reset_tokens (user_id, token, expires_at) VALUES (?, ?, ?)')
    .run(user.id, token, expiresAt);

  // Send email
  const resetUrl = `https://sdsp.jel.do/admin/reset-password?token=${token}`;
  
  if (!resend) {
    console.log('Password reset email (not sent - no API key):', { to: email, resetUrl });
    return res.json({ message: 'Password reset email sent (check server logs for URL)' });
  }
  
  try {
    await resend.emails.send({
      from: 'Start-DSP Toolkit <hi@jel.do>',
      to: email,
      subject: 'Reset your Start-DSP Toolkit password',
      html: `
        <p>Hi ${user.username},</p>
        <p>Click the link below to reset your password:</p>
        <p><a href="${resetUrl}">${resetUrl}</a></p>
        <p>This link expires in 1 hour.</p>
        <p>If you didn't request this, ignore this email.</p>
      `
    });
  } catch (err) {
    console.error('Failed to send email:', err);
  }

  res.json({ message: 'If an account with that email exists, a reset link has been sent.' });
});

// Reset password with token
router.post('/reset-password', async (req, res) => {
  const { token, password } = req.body;

  if (!token || !password) {
    return res.status(400).json({ error: 'Token and new password required' });
  }

  if (password.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters' });
  }

  const db = getDb();
  const record = db.prepare(`
    SELECT * FROM password_reset_tokens 
    WHERE token = ? AND used = 0 AND expires_at > datetime('now')
  `).get(token);

  if (!record) {
    return res.status(400).json({ error: 'Invalid or expired token' });
  }

  // Update password
  const hash = bcrypt.hashSync(password, 12);
  db.prepare('UPDATE users SET password_hash = ? WHERE id = ?').run(hash, record.user_id);

  // Mark token as used
  db.prepare('UPDATE password_reset_tokens SET used = 1 WHERE id = ?').run(record.id);

  res.json({ message: 'Password reset successful. You can now log in.' });
});

export default router;
