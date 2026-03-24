import { getDb } from './db.js';

export function requireAuth(req, res, next) {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  next();
}

export function requireRole(role) {
  return (req, res, next) => {
    if (!req.session || !req.session.userId) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const db = getDb();
    const user = db.prepare('SELECT role FROM users WHERE id = ?').get(req.session.userId);

    if (!user || user.role !== role) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    next();
  };
}

export function getCurrentUser(userId) {
  const db = getDb();
  return db.prepare('SELECT id, username, email, role, created_at, last_login FROM users WHERE id = ?').get(userId);
}
