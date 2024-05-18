import { Router } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { sendResetLinkEmail } from '../services/emailService.js';
import { generateToken } from '../utils/otp.js';

const router = Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let tokenStore = {}; // In-memory store for tokens, use a proper database in production

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../html/forget.html'));
});

router.post('/send-reset-link', (req, res) => {
  const { email } = req.body;
  const token = generateToken();
  tokenStore[token] = email; // Store token

  sendResetLinkEmail(email, token)
    .then(() => res.send('Password reset link sent to your email.'))
    .catch(err => res.status(500).send('Error sending reset link: ' + err.message));
});

router.get('/reset-password', (req, res) => {
  const { token } = req.query;
  const email = tokenStore[token];

  if (email) {
    // Render a password reset form
    res.send(`
      <form action="/forget/reset-password" method="POST">
        <input type="hidden" name="token" value="${token}" />
        <label for="password">New Password:</label>
        <input type="password" id="password" name="password" required />
        <button type="submit">Reset Password</button>
      </form>
    `);
  } else {
    res.status(400).send('Invalid or expired token.');
  }
});

router.post('/reset-password', (req, res) => {
  const { token, password } = req.body;
  const email = tokenStore[token];

  if (email) {
    // Update user's password in the database
    // Assuming you have a function updateUserPassword(email, password)
    updateUserPassword(email, password)
      .then(() => res.send('Password has been reset.'))
      .catch(err => res.status(500).send('Error resetting password: ' + err.message));
  } else {
    res.status(400).send('Invalid or expired token.');
  }
});

export default router;
