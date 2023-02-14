const express = require('express')
const router = express.Router({})
const { SignUpValidationSchema, SignInValidationSchema } = require('../validations')
const { validateSchema } = require('../middlewares')
const paramsContant = require('../constant/index')
const userCtrl = require('../controller')
const { expressjwt: jwt } = require('express-jwt')
const { StatusCodes } = require('http-status-codes')

router.post('/sign-up', validateSchema(SignUpValidationSchema, paramsContant.BODY), userCtrl.signUp)
router.post('/sign-in', validateSchema(SignInValidationSchema, paramsContant.BODY), userCtrl.signIn)
router.get('/sign-out', jwt({
  secret: process.env.TOKEN_SECRET,
  algorithms: ['HS256']
}), (req, res) => {
  return res.status(StatusCodes.CREATED).json({
    message: 'abc'
  })
})

module.exports = router
