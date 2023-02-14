const express = require('express')
const router = express.Router({})
const { SignUpValidationSchema, SignInValidationSchema } = require('../validations')
const validateSchema = require('../middlewares')
const userCtrl = require('../controller')
const { expressjwt: jwt } = require('express-jwt')
const { ALGOR_CONSTANT, REQUEST_PARAMS } = require('../constant/index')

router.post('/sign-up', validateSchema(SignUpValidationSchema, REQUEST_PARAMS.BODY), userCtrl.signUp)
router.post('/sign-in', validateSchema(SignInValidationSchema, REQUEST_PARAMS.BODY), userCtrl.signIn)
router.post('/sign-out', jwt({
  secret: process.env.TOKEN_SECRET,
  algorithms: [ALGOR_CONSTANT]
}), userCtrl.signOut)

module.exports = router
