const knex = require('../database')

const user = knex.schema.hasTable('users').then((exist) => {
  if (!exist) {
    return knex.schema.createTable('users', (table) => {
      table.increments('id').primary()
      table.varchar('firstName', 30)
      table.varchar('lastName', 30)
      table.varchar('email', 250).unique()
      table.varchar('password', 250)
      table.timestamps(true, true)
    }).then(() => console.log('user table created'))
  }
})

module.exports = user
