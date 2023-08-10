const { ViewPosts, Recipes, Users, Favorites, Likes } = require('../../database/models')
const { controllerWrapper } = require('../../utils/common')
const {paginate} = require('../../database/helper')
const {responseData} = require('./helper')

module.exports.get_posts_recipe = controllerWrapper(async (req, res) => {
    //const {order} = req.query
    const userId = req.user.id
    const pagination = req.pagination
    const includeOpts = {include: {
        model: ViewPosts,
        include: [
            Users,
            {
                model: Favorites,
                required: false,
                where: { userId }
            },
            {
                model: Likes,
                required: false,
                where: { userId }
            }
        ]
    }}
    const posts = await paginate(Recipes, {...pagination, ...includeOpts})
    posts.data = posts.data.map(post => responseData(post))
    res.json(posts)
})