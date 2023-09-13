
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
    '/recipe/steps/:id', 
    validateRequestSchema(require(resolve(__dirname, 'schema', 'in', 'posts.in-get-posts-recipe-steps-id.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schema', 'out', 'posts.out-get-posts-recipe-steps-id.schema.js'))),
    controller.get_posts_recipe_steps_id
)

router.get(
    '/recipe/ingredients/:id', 
    validateRequestSchema(require(resolve(__dirname, 'schema', 'in', 'posts.in-get-posts-recipe-ingredients-id.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schema', 'out', 'posts.out-get-posts-recipe-ingredients-id.schema.js'))),
    controller.get_posts_recipe_ingredients_id
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

//ROUTES ABOVE --DON'T TOUCH THIS--
module.exports = {
    postsRouter: router
}