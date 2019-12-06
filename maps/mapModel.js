const db = require('../database/dbConfig.js');

const findConservationOrganizations = () => {
    return db("users")
        .join("conservationists as cons", "users.id", "cons.cons_id")
        .where("roles", "conservationist")
        // .include()
        // .where("")
}

module.exports = { findConservationOrganizations };