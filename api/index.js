const express = require('express');
const checkJwt = require('../middleware/authJwt');

const router = express.Router();

// public routes
router.use('/users', require('./users'));

// private routes
router.use('/campaigns', checkJwt, require('./campaigns'));
router.use('/updates', checkJwt, require('./updates'));
router.use('/comments', checkJwt, require('./comments'));
router.use('/social', checkJwt, require('./social'));
router.use('/airtable', checkJwt, require('./airtable'));
router.use('/maps', checkJwt, require('./maps'));

module.exports = router;
