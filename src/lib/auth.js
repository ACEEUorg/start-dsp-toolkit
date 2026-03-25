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
  return db.prepare('SELECT id, username, email, role, permissions, created_at, last_login FROM users WHERE id = ?').get(userId);
}

export function getUserPermissions(userId) {
  const db = getDb();
  const user = db.prepare('SELECT role, permissions FROM users WHERE id = ?').get(userId);
  
  if (!user) return null;
  
  // Admins have full access
  if (user.role === 'admin') {
    return {
      canEditAllLanguages: true,
      languages: ['en', 'es', 'de', 'el'],
      canEditTranslations: true
    };
  }
  
  // Parse permissions JSON
  let perms = {};
  try {
    perms = user.permissions ? JSON.parse(user.permissions) : {};
  } catch (e) {
    perms = {};
  }
  
  return {
    canEditAllLanguages: false,
    languages: perms.languages || [],
    canEditTranslations: perms.canEditTranslations || false
  };
}
