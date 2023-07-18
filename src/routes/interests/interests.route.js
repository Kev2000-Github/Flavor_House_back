
const {Router} = require('express')
const router = Router()
const { resolve } = require('path')
const controller = require('./interests.controller')
const {validateRequestSchema, validateResponseSchema, authentication} = require('../../middlewares')

router.get(
    '/', 
    validateRequestSchema(require(resolve(__dirname, 'schema', 'in', 'interests.in-get-interests.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schema', 'out', 'interests.out-get-interests.schema.js'))),
    authentication,
    controller.get_interests
)

router.get(
    '/:id', 
    validateRequestSchema(require(resolve(__dirname, 'schema', 'in', 'interests.in-get-interests-id.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schema', 'out', 'interests.out-get-interests-id.schema.js'))),
    authentication,
    controller.get_interests_id
)

/*
router.post(
    '/', 
    validateRequestSchema(require(resolve(__dirname, 'schema', 'in', 'interests.in-post-interests.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schema', 'out', 'interests.out-post-interests.schema.js'))),
    authentication,
    controller.post_interests
)

router.put(
    '/:id', 
    validateRequestSchema(require(resolve(__dirname, 'schema', 'in', 'interests.in-put-interests-id.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schema', 'out', 'interests.out-put-interests-id.schema.js'))),
    authentication,
    controller.put_interests_id
)

router.delete(
    '/:id', 
    validateRequestSchema(require(resolve(__dirname, 'schema', 'in', 'interests.in-delete-interests-id.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schema', 'out', 'interests.out-delete-interests-id.schema.js'))),
    authentication,
    controller.delete_interests_id
)
*/

//ROUTES ABOVE --DON'T TOUCH THIS--
module.exports = {
    interestsRouter: router
}