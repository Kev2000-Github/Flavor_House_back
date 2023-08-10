const { Posts, ViewPostsLikes, Recipes, Users, Favorites, Likes } = require('../../database/models')
const { controllerWrapper } = require('../../utils/common')
const {paginate} = require('../../database/helper')
const {responseData} = require('./helper')
const { HttpStatusError } = require('../../errors/httpStatusError')
const {messages} = require('./messages')

module.exports.get_posts_recipe = controllerWrapper(async (req, res) => {
    //const {order} = req.query
    const userId = req.user.id
    const pagination = req.pagination
    const includeOpts = {include: {
        model: Posts,
        include: [
            Users,
            ViewPostsLikes,
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

module.exports.get_posts_recipe_id = controllerWrapper(async (req, res) => {
    const {id} = req.params
    const userId = req.user.id
    const includeOpts = {include: {
        model: Posts,
        include: [
            Users,
            ViewPostsLikes,
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
    const post = await Recipes.findByPk(id, includeOpts)
    if(!post) throw HttpStatusError.notFound(messages.notFound)
    res.json(responseData(post))
})