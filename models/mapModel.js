const db = require('../database/dbConfig.js');

const findConservationOrganizations = () => db('users')
  .join('conservationists as cons', 'users.id', 'cons.user_id')
  .where('roles', 'conservationist')
  .select('users.*', 'cons.*')
  .then((res) => res.filter((con) => !con.is_deactivated));

module.exports = { findConservationOrganizations };
