const bcrypt = require('bcrypt')
const knex = require('../database')
const { StatusCodes } = require('http-status-codes')
const { findUserByIdOrEmail } = require('../services')

/**
 * This function will register new user
 * @param {*} req
 * @param {*} res
 * @returns status code and user data
 */
const signup = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body
    const users = await findUserByIdOrEmail({ email })
    if (users.length) {
      return res.status(StatusCodes.CONFLICT).json({
        message: 'Email already exist'
      })
    }
    const saltRounds = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, saltRounds)

    const userIds = await knex('users').insert(
      {
        email,
        password: hashedPassword,
        firstName,
        lastName
      }
    )

    const result = await findUserByIdOrEmail({ id: userIds[0] })

    if (!result.length) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: 'user not found'
      })
    }
    return res.status(StatusCodes.CREATED).json({
      status: StatusCodes.CREATED,
      data: {
        id: result[0].id,
        firstName: result[0].firstName,
        lastName: result[0].lastName,
        email: result[0].email,
        displayName: `${result[0].firstName} ${result[0].lastName}`
      }
    })
  } catch (e) {
    console.log(e)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: JSON.stringify(e)
    })
  }
}

module.exports = {
  signup
}
