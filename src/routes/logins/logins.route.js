
const {Router} = require('express')
const router = Router()
const { resolve } = require('path')
const controller = require('./logins.controller')
const {validateRequestSchema, validateResponseSchema} = require('../../middlewares')

router.post(
    '/', 
    validateRequestSchema(require(resolve(__dirname, 'schema', 'in', 'logins.in-post-logins.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schema', 'out', 'logins.out-post-logins.schema.js'))),
    controller.post_logins
)
//ROUTES ABOVE --DON'T TOUCH THIS--
module.exports = {
    loginsRouter: router
}