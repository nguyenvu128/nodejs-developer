const knex = require('../database')

const user = knex.schema.hasTable('users').then((exist) => {
  if (!exist) {
    return knex.schema.createTable('users', (table) => {
      table.increments('id').primary()
      table.varchar('first_name', 30)
      table.varchar('last_name', 30)
      table.varchar('email', 250).unique()
      table.varchar('password', 250)
      table.timestamps()
    }).then(() => console.log('user table created'))
  }
})

module.exports = user
