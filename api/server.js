const express = require('express');
const server = express();

const helmet = require('helmet');
const cors = require('cors');

const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');

server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(express());
server.use(helmet());
server.use(cors());

server.get('/', (req, res) => {
  res.send(`<h1>Server live</h1>`);
});

// # Auth0 Middleware # //
const authConfig = {
  domain: 'key-conservation.auth0.com',
  audience: 'https://key-conservation'
};

// Define middleware that validates incoming bearer tokens
// using JWKS from YOUR_DOMAIN
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
  }),

  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithm: ['RS256']
});
console.log(checkJwt);
// # End Auth0 Middleware # //

// defined routes
server.use('/api/users', require('../users/usersRouter'));
server.use('/api/campaigns', require('../campaigns/campRouter'));
server.use(
  '/api/updates',
  require('../campaignUpdates/updateRouter')
);

module.exports = server;
