
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
//ROUTES ABOVE --DON'T TOUCH THIS--
module.exports = {
    postsRouter: router
}