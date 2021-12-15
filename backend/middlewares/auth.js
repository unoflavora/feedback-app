const jwt = require('jsonwebtoken')

const auth = async function (req, res, next) {
  //if user try to get authorization
  if(req.headers.authorization) {
    try {
      const authorization = req.headers.authorization.substring(7,)
      const verify = jwt.verify(authorization, process.env.JWT)
      if(verify) {
        req.user = verify
      }
    } catch(e) {
      next(e)
    }
  }

  //else next
  next()
}

module.exports = auth