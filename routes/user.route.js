const express = require('express')
const router = express.Router({})
const { SignUpValidationSchema, SignInValidationSchema } = require('../validations')
const validateMiddleware = require('../middlewares')
const paramsContant = require('../constant/index')
const userCtrl = require('../controller')

router.post('/sign-up', validateMiddleware(SignUpValidationSchema, paramsContant.BODY), userCtrl.signUp)
router.post('/sign-in', validateMiddleware(SignInValidationSchema, paramsContant.BODY), userCtrl.signIn)
module.exports = router
