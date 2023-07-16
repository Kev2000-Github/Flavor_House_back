const config = require("../config")
const { HttpStatusError } = require("../errors/httpStatusError")
const { controllerWrapper } = require("../utils/common")
const jwt = require('jsonwebtoken')

const authentication = controllerWrapper((req, res, next) => {
  const bearerToken = req.headers['authorization']
  if(!bearerToken) throw HttpStatusError.unauthorize({message: "A token is required for authentication"})
  const token = bearerToken.split(' ').pop()
  const decoded = jwt.verify(token, config.JWT_TOKEN)
  req.user = decoded
  next()
})

module.exports = {
  authentication
}