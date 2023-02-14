const express = require('express')
const router = express.Router()
require('../models/index')
const userRouter = require('./user.route')

router.use('/', userRouter)

module.exports = router
