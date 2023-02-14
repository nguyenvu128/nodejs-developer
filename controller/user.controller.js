require('dotenv').config()
const bcrypt = require('bcrypt')
const knex = require('../database')
const jwt = require('jsonwebtoken')
const { StatusCodes } = require('http-status-codes')
const { findUserByIdOrEmail } = require('../services')
const uuid = require('uuid')
/**
 * This function will register new user
 * @param {*} req
 * @param {*} res
 * @returns status code and user data
 */
const signUp = async (req, res) => {
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

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body
    const users = await findUserByIdOrEmail({ email })
    if (!users.length) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: 'Email or password incorrect'
      })
    }

    if (bcrypt.compareSync(password, users[0].password) === false) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Email or password incorrect'
      })
    }
    const refreshToken = uuid.v4()
    const token = jwt.sign({ email: users[0].email }, process.env.TOKEN_SECRET, { expiresIn: '1h' })
    // Create new Date instance
    const date = new Date()
    // Add a day
    const expiresIn = date.setDate(date.getDate() + 30)
    await knex('tokens').insert({
      userId: users[0].id,
      refreshToken,
      expiresIn
    })

    return res.status(StatusCodes.OK).json({
      user: {
        id: users[0].id,
        firstName: users[0].firstName,
        lastName: users[0].lastName,
        email: users[0].email,
        displayName: `${users[0].firstName} ${users[0].lastName}`
      },
      token,
      refreshToken
    })
  } catch (e) {
    console.log(e)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: JSON.stringify(e)
    })
  }
}

module.exports = {
  signUp,
  signIn
}
