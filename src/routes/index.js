const { Router } = require('express')
const router = Router()

router.use('/health', require('./health/health.route').healthRouter)
//SEPARATOR --DON'T TOUCH THIS--
module.exports = {
    router
}