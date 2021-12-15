const express = require('express')
const cors = require('cors')

require('dotenv').config()

const app = express()
const mongoose = require('mongoose')
const feedback = require('./routes/feedback')
const user = require('./routes/user')
const auth = require('./middlewares/auth')
const errorHandler = require('./middlewares/errorHandler')
const logger = require('./utils/logger')
const config = require('./utils/config')

app.use(cors())
mongoose.connect(config.URL, {useNewUrlParser: true})
  .then(() => {
    logger.info('connected to MongoDB')
  })

app.use(express.json())
app.use(auth)
app.use('/feedback', feedback)
app.use('/user', user)
app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/dist'))
app.use(errorHandler)

module.exports = app







