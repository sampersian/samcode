// Update with your config settings.

module.exports = {

  development: {
     client: 'pg',
     connection: 'postgres://pbflearqxpiols:taIOYKFH5xgeBxYdmBN10VvHaE@ec2-54-243-236-70.compute-1.amazonaws.com:5432/da0sg0crrb9frk' + '?ssl=true'
    //  connection: process.env.DATABASE_URL + '?ssl=true'

   },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
