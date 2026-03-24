#!/usr/bin/env node
import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');
const dataDir = join(ROOT, 'data');
const dbPath = join(dataDir, 'users.db');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize database
const db = new Database(dbPath);

// Create users table
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    email TEXT,
    role TEXT DEFAULT 'editor',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_login DATETIME
  )
`);

// Check if admin exists
const existingAdmin = db.prepare('SELECT id FROM users WHERE username = ?').get('admin');

if (existingAdmin) {
  console.log('Admin user already exists.');
  process.exit(0);
}

// Create admin user
const password = process.argv[2] || 'changeme';
const hash = bcrypt.hashSync(password, 12);

db.prepare(`
  INSERT INTO users (username, password_hash, email, role)
  VALUES (?, ?, ?, ?)
`).run('admin', hash, 'admin@example.com', 'admin');

console.log(`Admin user created!`);
console.log(`Username: admin`);
console.log(`Password: ${password}`);
console.log(`\nIMPORTANT: Change this password after first login!`);

// Close database
db.close();
