
const {Router} = require('express')
const router = Router()
const { resolve } = require('path')
const controller = require('./users.controller')
const {validateRequestSchema, validateResponseSchema, authentication} = require('../../middlewares')
const { paginationConfig } = require('../../middlewares/paginationConfig')

router.get(
    '/OTP', 
    validateRequestSchema(require(resolve(__dirname, 'schema', 'in', 'users.in-get-users-otp.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schema', 'out', 'users.out-get-users-otp.schema.js'))),
    controller.get_users_OTP
)

router.put(
    '/OTP', 
    validateRequestSchema(require(resolve(__dirname, 'schema', 'in', 'users.in-put-users-otp.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schema', 'out', 'users.out-put-users-otp.schema.js'))),
    authentication,
    controller.put_users_OTP
)

router.post(
    '/OTP', 
    validateRequestSchema(require(resolve(__dirname, 'schema', 'in', 'users.in-post-users-otp.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schema', 'out', 'users.out-post-users-otp.schema.js'))),
    controller.post_users_OTP
)

router.get(
    '/', 
    validateRequestSchema(require(resolve(__dirname, 'schema', 'in', 'users.in-get-users.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schema', 'out', 'users.out-get-users.schema.js'))),
    authentication,
    paginationConfig,
    controller.get_users
)

router.get(
    '/:id', 
    validateRequestSchema(require(resolve(__dirname, 'schema', 'in', 'users.in-get-users-id.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schema', 'out', 'users.out-get-users-id.schema.js'))),
    authentication,
    controller.get_users_id
)

router.post(
    '/', 
    validateRequestSchema(require(resolve(__dirname, 'schema', 'in', 'users.in-post-users.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schema', 'out', 'users.out-post-users.schema.js'))),
    controller.post_users
)

router.put(
    '/:id', 
    validateRequestSchema(require(resolve(__dirname, 'schema', 'in', 'users.in-put-users.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schema', 'out', 'users.out-put-users.schema.js'))),
    authentication,
    controller.put_users
)

router.delete(
    '/:id', 
    validateRequestSchema(require(resolve(__dirname, 'schema', 'in', 'users.in-delete-users.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schema', 'out', 'users.out-delete-users.schema.js'))),
    authentication,
    controller.delete_users
)


router.post(
    '/follow/:id', 
    validateRequestSchema(require(resolve(__dirname, 'schema', 'in', 'users.in-post-users-follow-id.schema.js'))),
    validateResponseSchema(require(resolve(__dirname, 'schema', 'out', 'users.out-post-users-follow-id.schema.js'))),
    authentication,
    controller.post_users_follow_id
)


//ROUTES ABOVE --DON'T TOUCH THIS--
module.exports = {
    usersRouter: router
}