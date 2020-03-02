const express = require('express');
const checkJwt = require('../middleware/authJwt');
const checkDeactivated = require('../middleware/restrictDeactivated');

const router = express.Router();

// public routes
router.use('/users', require('./users'));

// private routes
router.use('/campaigns', require('./campaigns'));
router.use('/updates', require('./updates'));
router.use('/comments', require('./comments'));
router.use('/social', require('./social'));
router.use('/airtable', require('./airtable'));
router.use('/maps', require('./maps'));
router.use('/reports', require('./reports'));
router.use(
  '/contributors',
  checkJwt,
  checkDeactivated,
  require('./contributors')
);
router.use('/submissions', require('./application_submissions'));

// router.use('/connections', checkJwt, checkDeactivated, require('./connections'));

module.exports = router;
