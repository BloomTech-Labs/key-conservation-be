const db = require('../dbConfig.js');

function findConservationOrganizations() {
  return db('users')
    .join('conservationists as cons', 'users.id', 'cons.user_id')
    .select('users.*', 'cons.*')
    .where({ roles: 'conservationist', 'users.is_deactivated': false });
}

module.exports = { findConservationOrganizations };
