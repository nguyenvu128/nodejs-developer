
require('dotenv').config()
const knexStringCase = require('knex-stringcase')
const knex = require('knex')(
  // this function will convert camelcase to snakecase
  knexStringCase({
    client: 'mysql',
    connection: {
      host: process.env.DB_HOST || '127.0.0.1',
      port: process.env.DB_PORT || 3306,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    },
    pool: { min: 0, max: 7 }
  })
)

knex.raw('SELECT VERSION()').then((...args) => {
  console.log('connect to database successfully')
})
  .catch(err => {
    console.log(err)
  })

module.exports = knex
