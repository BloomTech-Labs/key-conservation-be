const express = require('express');
const checkJwt = require('../middleware/authJwt');
const checkDeactivated = require('../middleware/restrictDeactivated');

const router = express.Router();

// public routes
router.use('/users', require('./users'));

// private routes
router.use('/campaigns', checkJwt, checkDeactivated, require('./campaigns'));
router.use('/updates', checkJwt, checkDeactivated, require('./updates'));
router.use('/comments', checkJwt, checkDeactivated, require('./comments'));
router.use('/social', checkJwt, checkDeactivated, require('./social'));
router.use('/airtable', checkJwt, checkDeactivated, require('./airtable'));
router.use('/maps', checkJwt, checkDeactivated, require('./maps'));
router.use('/reports', checkJwt, checkDeactivated, require('./reports'));
router.use(
  '/contributors',
  checkJwt,
  checkDeactivated,
  require('./contributors'),
);
// router.use('/connections', checkJwt, checkDeactivated, require('./connections'));

module.exports = router;
