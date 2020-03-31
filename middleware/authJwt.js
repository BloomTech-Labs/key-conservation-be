const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

// # Auth0 Middleware # //
const authConfig = {
  domain: 'key-conservation.auth0.com',
  audience: '',
};

// Define middleware that validates incoming bearer tokens
// using JWKS from YOUR_DOMAIN
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`,
  }),

  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithm: ['RS256'],
});

module.exports = checkJwt;
// # End Auth0 Middleware # //
