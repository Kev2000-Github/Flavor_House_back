
const {Router} = require('express')
const router = Router()
const { resolve } = require('path')
const controller = require('./reviews.controller')
const {validateRequestSchema, validateResponseSchema, authentication,paginationConfig} = require('../../middlewares')

router.get(
    '/:recipeId', 
    validateRequestSchema(require(resolve(__dirname, 'schema', 'in', 'reviews.in-get-reviews.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schema', 'out', 'reviews.out-get-reviews.schema.js'))),
    authentication,
    paginationConfig,
    controller.get_reviews
)

router.put(
    '/:id', 
    validateRequestSchema(require(resolve(__dirname, 'schema', 'in', 'reviews.in-put-reviews-id.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schema', 'out', 'reviews.out-put-reviews-id.schema.js'))),
    authentication,
    controller.put_reviews_id
)

router.delete(
    '/:id', 
    validateRequestSchema(require(resolve(__dirname, 'schema', 'in', 'reviews.in-delete-reviews-id.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schema', 'out', 'reviews.out-delete-reviews-id.schema.js'))),
    authentication,
    controller.delete_reviews_id
)

router.post(
    '/', 
    validateRequestSchema(require(resolve(__dirname, 'schema', 'in', 'reviews.in-post-reviews.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schema', 'out', 'reviews.out-post-reviews.schema.js'))),
    authentication,
    controller.post_reviews
)
//ROUTES ABOVE --DON'T TOUCH THIS--
module.exports = {
    reviewsRouter: router
}