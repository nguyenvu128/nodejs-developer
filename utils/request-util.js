const { StatusCodes } = require('http-status-codes')

/**
 * This function will response error message
 * @param {*} err
 * @param {*} res
 * @param {*} next
 * @returns
 */
const joiValidationResponse = (err, res, next) => {
  try {
    const messages = err.details.map(detail => {
      return detail.message
    })

    return res.status(StatusCodes.BAD_REQUEST).json({
      messages
    })
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  joiValidationResponse
}
