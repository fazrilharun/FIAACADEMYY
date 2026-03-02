import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db.js';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-for-dev';

// Generate ID helper
const generateId = () => Math.random().toString(36).substring(2, 15);

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, major } = req.body;

    if (!name || !email || !password || !major) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if user exists
    const existingUser = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const id = generateId();

    db.prepare(`
      INSERT INTO users (id, name, email, password, provider, major)
      VALUES (?, ?, ?, ?, 'credentials', ?)
    `).run(id, name, email, hashedPassword, major);

    const token = jwt.sign({ id, email, role: 'user' }, JWT_SECRET, { expiresIn: '7d' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    const user = db.prepare('SELECT id, name, email, image, major, xp, points, level, streak, role FROM users WHERE id = ?').get(id);
    res.json({ user });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as any;
    
    if (!user || user.provider !== 'credentials') {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    const { password: _, ...userWithoutPassword } = user;
    res.json({ user: userWithoutPassword });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get current user
router.get('/me', (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any;
    const user = db.prepare('SELECT id, name, email, image, major, xp, points, level, streak, role FROM users WHERE id = ?').get(decoded.id);
    
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Logout
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ success: true });
});

// Google OAuth URL
router.get('/google/url', (req, res) => {
  const redirectUri = \`\${req.protocol}://\${req.get('host')}/api/auth/google/callback\`;
  
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID || '',
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'email profile',
    access_type: 'offline',
    prompt: 'consent'
  });

  res.json({ url: \`https://accounts.google.com/o/oauth2/v2/auth?\${params}\` });
});

// Google OAuth Callback
router.get('/google/callback', async (req, res) => {
  try {
    const { code } = req.query;
    const redirectUri = \`\${req.protocol}://\${req.get('host')}/api/auth/google/callback\`;
    
    if (!code) {
      return res.status(400).send('No code provided');
    }

    // Exchange code for tokens
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code: code as string,
        client_id: process.env.GOOGLE_CLIENT_ID || '',
        client_secret: process.env.GOOGLE_CLIENT_SECRET || '',
        redirect_uri: redirectUri,
        grant_type: 'authorization_code'
      })
    });

    const tokenData = await tokenResponse.json();
    
    if (tokenData.error) {
      throw new Error(tokenData.error_description || 'Failed to get token');
    }

    // Get user info
    const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: \`Bearer \${tokenData.access_token}\` }
    });
    
    const userData = await userResponse.json();
    
    // Check if user exists
    let user = db.prepare('SELECT * FROM users WHERE email = ?').get(userData.email) as any;
    
    if (!user) {
      // Create new user
      const id = generateId();
      db.prepare(\`
        INSERT INTO users (id, name, email, provider, image, major)
        VALUES (?, ?, ?, 'google', ?, 'niaga')
      \`).run(id, userData.name, userData.email, userData.picture);
      
      user = db.prepare('SELECT * FROM users WHERE id = ?').get(id);
    } else if (user.provider !== 'google') {
      // Update existing user to link google account if needed, or just proceed
      // For simplicity, we just proceed
    }

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    // Send success message to parent window and close popup
    res.send(\`
      <html>
        <body>
          <script>
            if (window.opener) {
              window.opener.postMessage({ type: 'OAUTH_AUTH_SUCCESS' }, '*');
              window.close();
            } else {
              window.location.href = '/';
            }
          </script>
          <p>Authentication successful. This window should close automatically.</p>
        </body>
      </html>
    \`);
  } catch (error) {
    console.error('Google OAuth error:', error);
    res.status(500).send('Authentication failed');
  }
});

export default router;
