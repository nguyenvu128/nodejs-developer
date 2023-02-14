const knex = require('../database')

const token = knex.schema.hasTable('users').then((exist) => {
  if (!exist) {
    return knex.schema.createTable('tokens', (table) => {
      table.increments('id').primary()
      table.integer('userId').unsigned().notNullable()
      table
        .foreign('userId')
        .references('id')
        .inTable('users')
      table.varchar('refreshToken', 250)
      table.varchar('expiresIn', 64)
      table.timestamps()
    }).then(() => console.log('table created'))
  }
})

module.exports = token
