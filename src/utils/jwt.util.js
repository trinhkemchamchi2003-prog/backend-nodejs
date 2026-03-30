const jwt = require('jsonwebtoken');

// CREATE TOKEN
function createToken(payload) {
  const secret = process.env.AUTH_SECRET_KEY;
  return jwt.sign(payload, secret, { expiresIn: '8h' });
}

// VERIFY TOKEN
function verifyTokenJWT(token) {
  try {
    const secret = process.env.AUTH_SECRET_KEY;
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    console.error('Token verification failed:', error.message);
    return null;
  }
}

module.exports = {
  createToken,
  verifyTokenJWT,
};
