
const {Router} = require('express')
const router = Router()
const { resolve } = require('path')
const controller = require('./picturers.controller')
const {validateRequestSchema, validateResponseSchema} = require('../../middlewares')

router.get(
    '/display/:key', 
    validateRequestSchema(require(resolve(__dirname, 'schema', 'in', 'picturers.in-get-picturers-picture-display-key.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schema', 'out', 'picturers.out-get-picturers-picture-display-key.schema.js'))),
    controller.get_picturers_picture_display_key
)
//ROUTES ABOVE --DON'T TOUCH THIS--
module.exports = {
    picturersRouter: router
}