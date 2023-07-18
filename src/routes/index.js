const { Router } = require('express')
const router = Router()

router.use('/health', require('./health/health.route').healthRouter)
router.use('/users', require('./users/users.route').usersRouter)
router.use('/interests', require('./interests/interests.route').interestsRouter)
//SEPARATOR --DON'T TOUCH THIS--
module.exports = {
    router
}