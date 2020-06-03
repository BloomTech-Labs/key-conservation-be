const express = require('express');
const checkJwt = require('../middleware/authJwt');
const checkDeactivated = require('../middleware/restrictDeactivated');

const router = express.Router();

// public routes
router.use('/users', require('./users'));

// private routes
router.use('/notifications', require('./notifications')); // Our notifications API
router.use('/campaigns', checkJwt, checkDeactivated, require('./campaigns'));
router.use('/comments', checkJwt, checkDeactivated, require('./comments'));
router.use('/social', checkJwt, checkDeactivated, require('./social'));
router.use('/airtable', checkJwt, checkDeactivated, require('./airtable'));
router.use('/maps', checkJwt, checkDeactivated, require('./maps'));
router.use('/reports', checkJwt, checkDeactivated, require('./reports'));
router.use('/contributors', checkJwt, checkDeactivated, require('./contributors'));
router.use('/submissions', checkJwt, checkDeactivated, require('./application_submissions'));
router.use('/feed', checkJwt, checkDeactivated, require('./feed'));
router.use('/posts', checkJwt, checkDeactivated, require('./posts'));

// router.use('/connections', checkJwt, checkDeactivated, require('./connections'));

module.exports = router;
