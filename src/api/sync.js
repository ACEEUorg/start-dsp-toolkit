import { Router } from 'express';
import { execSync } from 'child_process';
import { getCurrentUser } from '../lib/auth.js';

const router = Router();

router.post('/', (req, res) => {
  const user = getCurrentUser(req.session.userId);
  const username = user?.username || 'unknown';
  
  try {
    // Stage all changes
    execSync('git add -A', {
      cwd: process.cwd(),
      stdio: 'pipe'
    });

    // Check if there are changes to commit
    const status = execSync('git status --porcelain', {
      cwd: process.cwd(),
      encoding: 'utf8'
    });

    if (!status.trim()) {
      return res.json({ message: 'No changes to commit', synced: false });
    }

    // Commit with message including username
    const timestamp = new Date().toISOString().split('T')[0];
    const message = `Update content from admin (${username}) - ${timestamp}`;
    
    execSync(`git commit -m "${message}"`, {
      cwd: process.cwd(),
      stdio: 'pipe'
    });

    // Push to remote
    execSync('git push', {
      cwd: process.cwd(),
      stdio: 'pipe',
      env: {
        ...process.env,
        GIT_ASKPASS: 'echo',
        GIT_TERMINAL_PROMPT: '0'
      }
    });

    res.json({ 
      success: true, 
      message: 'Changes pushed to GitHub',
      commit: message
    });

  } catch (err) {
    const errorMsg = err.message || 'Sync failed';
    
    // Check for specific errors
    if (errorMsg.includes('nothing to commit')) {
      return res.json({ message: 'No changes to commit', synced: false });
    }
    
    res.status(500).json({ error: errorMsg });
  }
});

export default router;
