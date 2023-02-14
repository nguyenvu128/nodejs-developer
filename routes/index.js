const express = require('express')
const router = express.Router()
require('../models/index')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

module.exports = router