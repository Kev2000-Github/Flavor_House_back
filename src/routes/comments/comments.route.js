
const {Router} = require('express')
const router = Router()
const { resolve } = require('path')
const controller = require('./comments.controller')
const {validateRequestSchema, validateResponseSchema, authentication,paginationConfig} = require('../../middlewares')

router.get(
    '/:postId', 
    validateRequestSchema(require(resolve(__dirname, 'schema', 'in', 'comments.in-get-comments.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schema', 'out', 'comments.out-get-comments.schema.js'))),
    authentication,
    paginationConfig,
    controller.get_comments
)

router.delete(
    '/:id', 
    validateRequestSchema(require(resolve(__dirname, 'schema', 'in', 'comments.in-delete-comments-id.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schema', 'out', 'comments.out-delete-comments-id.schema.js'))),
    authentication,
    controller.delete_comments_id
)

router.put(
    '/:id', 
    validateRequestSchema(require(resolve(__dirname, 'schema', 'in', 'comments.in-put-comments-id.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schema', 'out', 'comments.out-put-comments-id.schema.js'))),
    authentication,
    controller.put_comments_id
)

router.post(
    '/', 
    validateRequestSchema(require(resolve(__dirname, 'schema', 'in', 'comments.in-post-comments.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schema', 'out', 'comments.out-post-comments.schema.js'))),
    authentication,
    controller.post_comments
)
//ROUTES ABOVE --DON'T TOUCH THIS--
module.exports = {
    commentsRouter: router
}