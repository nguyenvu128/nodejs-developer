const knex = require('../database')

/**
 * This function will find user with id or email
 * @param {*} data
 * @returns user data
 */
const findUserByIdOrEmail = async (data) => {
  try {
    return await knex('users').where({
      ...data
    })
  } catch (e) {
    console.log(e)
    throw new Error(e)
  }
}

module.exports = {
  findUserByIdOrEmail
}
