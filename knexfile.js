require('dotenv').config();

const dbConnection = {
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_NAME,
};

module.exports = {
  development: {
    client: 'pg',
    connection: dbConnection,
    migrations: {
      directory: './database/migrations',
      tablename: 'knex_migrations',
    },
    seeds: {
      directory: './database/seeds',
    },
    pool: {
      min: 2,
      max: 10,
    },
    useNullAsDefault: true,
  },

  production: {
    client: 'pg',
    connection: dbConnection,
    migrations: {
      directory: './database/migrations',
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: './database/seeds',
    },
    useNullAsDefault: true,
    ssl: true,
  },
};
