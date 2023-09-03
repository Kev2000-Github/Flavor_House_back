
const {Router} = require('express')
const router = Router()
const { resolve } = require('path')
const controller = require('./posts.controller')
const {validateRequestSchema, validateResponseSchema, paginationConfig, authentication} = require('../../middlewares')

router.get(
    '/recipe', 
    validateRequestSchema(require(resolve(__dirname, 'schema', 'in', 'posts.in-get-posts-recipe.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schema', 'out', 'posts.out-get-posts-recipe.schema.js'))),
    authentication,
    paginationConfig,
    controller.get_posts_recipe
)

router.get(
    '/recipe/:id', 
    validateRequestSchema(require(resolve(__dirname, 'schema', 'in', 'posts.in-get-posts-recipe-id.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schema', 'out', 'posts.out-get-posts-recipe-id.schema.js'))),
    authentication,
    controller.get_posts_recipe_id
)

router.post(
    '/recipe', 
    validateRequestSchema(require(resolve(__dirname, 'schema', 'in', 'posts.in-post-posts-recipe.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schema', 'out', 'posts.out-post-posts-recipe.schema.js'))),
    authentication,
    controller.post_posts_recipe
)

router.put(
    '/recipe/:id', 
    validateRequestSchema(require(resolve(__dirname, 'schema', 'in', 'posts.in-put-posts-recipe-id.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schema', 'out', 'posts.out-put-posts-recipe-id.schema.js'))),
    authentication,
    controller.put_posts_recipe_id
)

router.delete(
    '/recipe/:id', 
    validateRequestSchema(require(resolve(__dirname, 'schema', 'in', 'posts.in-delete-posts-recipe-id.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schema', 'out', 'posts.out-delete-posts-recipe-id.schema.js'))),
    authentication,
    controller.delete_posts_recipe_id
)


// moment routes

router.get(
    '/moment',
    validateRequestSchema(require(resolve(__dirname, 'schema', 'in', 'posts.in-get-posts-moment-query.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schema', 'out', 'posts.out-get-posts-moment-query.schema.js'))),
    authentication,
    paginationConfig,
    controller.get_posts_moment
)

router.get(
    '/moment/:id',
    validateRequestSchema(require(resolve(__dirname, 'schema', 'in', 'posts.in-get-posts-moment-id.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schema', 'out', 'posts.out-get-posts-moment-id.schema.js'))),
    authentication,
    controller.get_posts_moment_id
)

router.post(
    '/moment',
    validateRequestSchema(require(resolve(__dirname, 'schema', 'in', 'posts.in-post-posts-moment.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schema', 'out', 'posts.out-post-posts-moment.schema.js'))),
    authentication,
    controller.post_posts_moment
)

router.put(
    '/moment/:id',
    validateRequestSchema(require(resolve(__dirname, 'schema', 'in', 'posts.in-put-posts-moment-id.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schema', 'out', 'posts.out-put-posts-moment-id.schema.js'))),
    authentication,
    controller.put_posts_moment_id
)

router.delete(
    '/moment/:id',
    validateRequestSchema(require(resolve(__dirname, 'schema', 'in', 'posts.in-delete-posts-moment.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schema', 'out', 'posts.out-delete-posts-moment.schema.js'))),
    authentication,
    controller.delete_posts_moment_id
)

//ROUTES ABOVE --DON'T TOUCH THIS--
module.exports = {
    postsRouter: router
}