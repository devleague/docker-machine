// Update with your config settings.

require('dotenv').config({ path: '../.env'});
module.exports = {
  client: 'postgresql',
  connection: {
    host: process.env.POSTGRES_HOSTNAME,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    directory: './server/database/migrations',
    tableName: 'knex_migrations'
  },
  seeds: {
    directory: './server/database/seeds'
  }
};
