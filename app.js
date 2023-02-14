require('dotenv').config()
const { StatusCodes } = require('http-status-codes')
const http = require('http')
const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/', require('./routes/index'))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  return res.status(StatusCodes.NOT_FOUND).json({
    message: 'Not Found'
  })
})

// error handler
app.use(function (err, req, res, next) {
  const msg = err.message ? err.message : JSON.stringify(err)
  console.log(err)
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: msg
  })
})

// get the port and set the port for the server
const port = process.env.PORT || 3000
app.set('port', port)

// create server
const server = http.createServer(app)
server.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

module.exports = app
