require('dotenv').config();

// Postgres imports
const pg = require('pg');
pg.defaults.ssl = false;

const localPgConnection = {
  host: '192.168.99.100',
  port: '5432',
  password: '',
  user: 'postgres',
  database: 'postgres'
};

// Production database connection
const dbConnection = process.env.DATABASE_URL || localPgConnection;

console.log(process.env.DATABASE_URL);

// Postgres configurations
// Command for running postgres locally:
// knex migrate:latest --env production
// knex seed:run --env production
module.exports = {
  development: {
    client: 'pg',
    connection: dbConnection,
    migrations: {
      directory: './database/migrations',
      tablename: 'knex_migrations'
    },
    seeds: {
      directory: './database/seeds'
    },
    pool: {
      min: 2,
      max: 10
    },
    useNullAsDefault: true
  },

  testing: {
    client: 'pg',
    connection: dbConnection,
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations',
      tablename: 'knex_migrations'
    },
    seeds: {
      directory: './database/seeds'
    },
    useNullAsDefault: true
  },

  production: {
    client: 'pg',
    connection: dbConnection,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './database/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './database/seeds'
    },
    useNullAsDefault: true
  }
};
