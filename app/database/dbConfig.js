const knex = require('knex');

const env = process.env.DB_ENV || 'development';
const knexConfig = require('../../knexfile.js')[env];

module.exports = knex(knexConfig);
