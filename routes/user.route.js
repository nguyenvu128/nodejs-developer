const express = require('express')
const router = express.Router({})
const { SignupValidationSchema } = require('../validations')
const validateMiddleware = require('../middlewares')
const paramsContant = require('../constant/index')
const userCtrl = require('../controller')

router.post('/sign-up', validateMiddleware(SignupValidationSchema, paramsContant.BODY), userCtrl.signup)

module.exports = router
