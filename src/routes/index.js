const { Router } = require('express')
const router = Router()

router.use('/health', require('./health/health.route').healthRouter)
router.use('/users', require('./users/users.route').usersRouter)
router.use('/interests', require('./interests/interests.route').interestsRouter)
router.use('/posts', require('./posts/posts.route').postsRouter)
router.use('/countries', require('./countries/countries.route').countriesRouter)
router.use('/comments', require('./comments/comments.route').commentsRouter)
router.use('/reviews', require('./reviews/reviews.route').reviewsRouter)
router.use('/logins', require('./logins/logins.route').loginsRouter)
router.use('/picturers', require('./picturers/picturers.route').picturersRouter)
//SEPARATOR --DON'T TOUCH THIS--
module.exports = {
    router
}