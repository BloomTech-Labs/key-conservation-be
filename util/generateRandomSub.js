const crypto = require('crypto');

const generateRandomSub = () => crypto.randomBytes(12).toString('hex');

module.exports = generateRandomSub;
