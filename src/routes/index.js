const { Router } = require('express')
const router = Router()

router.use('/health', require('./health/health.route').healthRouter)
router.use('/users', require('./users/users.route').usersRouter)
//SEPARATOR --DON'T TOUCH THIS--
module.exports = {
    router
}