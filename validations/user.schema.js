const Joi = require('joi')

const SignupValidationSchema = Joi.object().keys({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(8).max(30),
  firstName: Joi.string().required(),
  lastName: Joi.string().required()
}
)

module.exports = {
  SignupValidationSchema
}
