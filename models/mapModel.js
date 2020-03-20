const db = require('../database/dbConfig.js');

const findConservationOrganizations = () => db('users')
  .join('conservationists as cons', 'users.id', 'cons.users_id')
  .where('roles', 'conservationist')
  .select('users.*', 'cons.*', 'cons.org_name as name')
  .then(res => res.filter(con => !con.is_deactivated));
// .include()
// .where("")

module.exports = { findConservationOrganizations };
