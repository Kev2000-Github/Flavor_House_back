const config = require('../config')
const { HttpStatusError } = require('../errors/httpStatusError')
const { controllerWrapper } = require('../utils/common')
const jwt = require('jsonwebtoken')
const {Users} = require('../database/models')

const authentication = controllerWrapper(async (req, res, next) => {
    const bearerToken = req.headers['authorization']
    if(!bearerToken) throw HttpStatusError.unauthorize({code: 'auth', message: 'A token is required for authentication'})
    const token = bearerToken.split(' ').pop()
    const decoded = jwt.verify(token, config.JWT_TOKEN, (err) => {
        throw HttpStatusError.unauthorize({code: 'auth', message: 'Expired token'})
    })
    const user = await Users.findByPk(decoded.id)
    if(!user) throw HttpStatusError.unauthorize({code: 'auth', message: 'invalid session'})
    req.user = decoded
    next()
})

module.exports = {
    authentication
}