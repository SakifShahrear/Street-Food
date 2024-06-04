import crypto from 'crypto';

function generateToken() {
  return crypto.randomBytes(20).toString('hex');
}
