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
    ViewRecipeStars,
    sequelize} = require('../../database/models')
const { controllerWrapper } = require('../../utils/common')
const {paginate} = require('../../database/helper')
const {isEditable, getRecipeSearchOpts, formatOrder, recipeResponseData} = require('./helper')
const { HttpStatusError } = require('../../errors/httpStatusError')
const {messages} = require('./messages')
const { POST_TYPE } = require('../../database/constants')
const uuid = require('uuid').v4

const includeOpts = (userId, tag = true) => {
    const val =  {
        include: [{
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
        }]}
    if(tag) val.include.push({model: Interests, as: 'Tags'})
    return val
}

module.exports.get_posts_recipe = controllerWrapper(async (req, res) => {
    const userId = req.user.id
    const pagination = req.pagination
    const order = formatOrder(req.query?.order)
    let opts = await getRecipeSearchOpts(req.query?.search, req.query?.tags)
    if(opts.include.length === 0){
        opts = {...opts, ...includeOpts(userId)}
    }
    else{
        opts.include.push((includeOpts(userId, false)).include[0])
    }
    if(order) opts.order = [['createdAt', order]]
    opts = {...opts, ...pagination}
    opts.include.push(ViewRecipeStars)
    const posts = await paginate(Recipes, opts)
    posts.data = posts.data.map(post => recipeResponseData(post))
    res.json(posts)
})

module.exports.get_posts_recipe_id = controllerWrapper(async (req, res) => {
    const {id} = req.params
    const userId = req.user.id
    const post = await Recipes.findByPk(id, includeOpts(userId))
    if(!post) throw HttpStatusError.notFound(messages.notFound)
    res.json(recipeResponseData(post))
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
        await recipes.addTags(tags, {transaction})
        await Ingredients.bulkCreate(recipeIngredients, {transaction})
        await Steps.bulkCreate(recipeSteps, {transaction})
    })
    const post = await Recipes.findByPk(postId, includeOpts(userId))
    if(!post) throw HttpStatusError.notFound(messages.notFound)
    res.json(recipeResponseData(post))
})

module.exports.put_posts_recipe_id = controllerWrapper(async (req, res) => {
    const {title, description, tags, ingredients, steps, picture} = req.body
    const userId = req.user.id
    const postId = req.params.id
    const recipe = await Recipes.findByPk(postId, { include: [Posts] })
    if(!recipe) throw HttpStatusError.notFound(messages.notFound)
    if(recipe.Post.madeBy !== userId) throw HttpStatusError.forbidden(messages.notOwner)
    if(!isEditable(recipe.createdAt)){
        throw HttpStatusError.notFound(messages.notEditable)
    }
    await sequelize.transaction(async transaction => {
        //INGREDIENTS
        const recipeIngredients = ingredients.map(ingredient => ({
            id: uuid(),
            recipeId: postId,
            description: ingredient
        }))
        //STEPS
        const recipeSteps = steps.map(step => ({
            id: uuid(),
            recipeId: postId,
            description: step.description,
            image: step.picture
        }))
        //GENERAL INFORMATION
        await recipe.update({
            name: title,
            description,
            image: picture
        }, {transaction})
        //TAGS
        await recipe.setTags(tags, {transaction})
        await Ingredients.destroy({where: {recipeId: postId}, transaction})
        await Ingredients.bulkCreate(recipeIngredients, {transaction})
        await Steps.destroy({where: {recipeId: postId}, transaction})
        await Steps.bulkCreate(recipeSteps, {transaction})
    })
    const updatedPost = await Recipes.findByPk(postId, includeOpts(userId))
    if(!updatedPost) throw HttpStatusError.notFound(messages.notFound)
    res.json(recipeResponseData(updatedPost))
})


module.exports.delete_posts_recipe_id = controllerWrapper(async (req, res) => {
    const postId = req.params.id
    const userId = req.user.id
    const recipe = await Recipes.findByPk(postId, { include: [Posts] })
    if(!recipe) throw HttpStatusError.notFound(messages.notFound)
    if(recipe.Post.madeBy !== userId) throw HttpStatusError.forbidden(messages.notOwner)
    await sequelize.transaction(async transaction => {
        await recipe.setTags([], {transaction})
        await Ingredients.destroy({where: {recipeId: postId}, transaction})
        await Steps.destroy({where: {recipeId: postId}, transaction})
        await recipe.destroy({transaction})
    })
    res.json({deleted: true})
})
