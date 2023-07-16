const {Router} = require('express')
const router = Router()
const { resolve } = require('path')
const controller = require('./health.controller')
const {validateRequestSchema, validateResponseSchema} = require('../../middlewares')

router.get(
    '/', 
    validateRequestSchema(require(resolve(__dirname, 'health.in-get-health.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'health.out-get-health.schema.js'))),
    controller.get_health
)
//ROUTES ABOVE --DON'T TOUCH THIS--
module.exports = {
    healthRouter: router
}