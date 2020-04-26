const jwt = require('jsonwebtoken');

const secrets = require('../config/secrets.js');

function generateToken(user) {
  const payload = {
    subject: user.id, // sub in payload is what the token is about if you want
    name: user.sup_name || user.org_name || 'User',
    roles: ['Student'],
  };
  const options = { expiresIn: '1d' };
  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = { generateToken };
