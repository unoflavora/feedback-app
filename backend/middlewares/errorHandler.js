const logger = require('../utils/logger')
const errorHandler = (err, req, res, next) => {
  logger.info(err)
  //if jwt is expired
  if(err.name === 'TokenExpiredError') {
    res.status(401).json({error: `${err.message} at ${err.expiredAt}`})
  } else if(err.name === 'JsonWebTokenError') {
    res.status(401).json({error: 'Token Invalid!'})
  } else if(err.code === 11000) {
    res.status(401).json({error: 'Username already exists!'})
  } else if(err.status === 401) {
    res.status(401).json({error: 'Unauthorized!'})
  } else {
    res.status(500).end()
  }
  next()
}

module.exports = errorHandler