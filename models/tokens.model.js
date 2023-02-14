const knex = require('../database')

const token = knex.schema.hasTable('users').then((exist) => {
  if (!exist) {
    return knex.schema.createTable('tokens', (table) => {
      table.increments('id').primary()
      table.integer('user_id').unsigned().notNullable()
      table
        .foreign('user_id')
        .references('id')
        .inTable('users')
      table.varchar('refresh_token', 250)
      table.varchar('expires_in', 64)
      table.timestamps()
    }).then(() => console.log('table created'))
  }
})

module.exports = token
