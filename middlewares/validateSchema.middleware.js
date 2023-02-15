
const { StatusCodes } = require('http-status-codes')
const requestUtil = require('../utils')

/**
 * validate input data before receiving request from client
 * @param {*} schema Joi validator schema
 * @param {*} parameter params constant body
 * @returns next()
 */
module.exports = (schema, parameter) => (req, res, next) => {
  try {
    const dataNeedValidation = {}
    Object.assign(dataNeedValidation, req[parameter])

    const { error } = schema.validate(dataNeedValidation)

    if (error) {
      return requestUtil.joiValidationResponse(error, res)
    }

    return next()
  } catch (e) {
    const msg = e.message ? e.message : JSON.stringify(e)
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: msg
    })
  }
}
