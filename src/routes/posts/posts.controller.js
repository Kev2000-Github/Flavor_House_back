const { 
    Posts, 
    ViewPostsLikes, 
    Recipes, 
    Users, 
    Favorites, 
    Likes, 
    Interests, 
    Ingredients,
    Steps,
    sequelize } = require('../../database/models')
const { controllerWrapper } = require('../../utils/common')
const {paginate} = require('../../database/helper')
const {responseData} = require('./helper')
const { HttpStatusError } = require('../../errors/httpStatusError')
const {messages} = require('./messages')
const { POST_TYPE } = require('../../database/constants')
const uuid = require('uuid').v4

const includeOpts = (userId) => ({
    include: [{model: Interests, as: 'Tags'}, {
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
    }]})

module.exports.get_posts_recipe = controllerWrapper(async (req, res) => {
    //const {order} = req.query
    const userId = req.user.id
    const pagination = req.pagination
    
    const posts = await paginate(Recipes, {...pagination, ...includeOpts(userId)})
    posts.data = posts.data.map(post => responseData(post))
    res.json(posts)
})

module.exports.get_posts_recipe_id = controllerWrapper(async (req, res) => {
    const {id} = req.params
    const userId = req.user.id
    const post = await Recipes.findByPk(id, includeOpts(userId))
    if(!post) throw HttpStatusError.notFound(messages.notFound)
    res.json(responseData(post))
})

module.exports.post_posts_recipe = controllerWrapper(async (req, res) => {
    const {title, description, tags, ingredients, steps, picture} = req.body
    const userId = req.user.id
    const postId = uuid()
    await sequelize.transaction(async transaction => {
        const recipeIngredients = ingredients.map(ingredient => ({
            id: uuid(),
            recipeId: postId,
            description: ingredient
        }))
        const recipeSteps = steps.map(step => ({
            id: uuid(),
            recipeId: postId,
            description: step.description,
            image: step.picture
        }))
        await Posts.create({
            id: postId,
            madeBy: userId,
            type: POST_TYPE.RECIPE
        }, {transaction})
        const recipes = await Recipes.create({
            postId,
            name: title,
            description,
            image: picture
        }, {transaction})
        recipes.addTags(tags)
        await Ingredients.bulkCreate(recipeIngredients, {transaction})
        await Steps.bulkCreate(recipeSteps, {transaction})
    })
    const post = await Recipes.findByPk(postId, includeOpts(userId))
    if(!post) throw HttpStatusError.notFound(messages.notFound)
    res.json(responseData(post))
})
