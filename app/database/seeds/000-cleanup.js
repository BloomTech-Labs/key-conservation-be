const cleaner = require('knex-cleaner');

exports.seed = (knex) => cleaner.clean(knex, {
  ignoreTables: ['knex_migrations', 'knex_migrations_lock'],
});
