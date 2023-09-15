const {
    Posts,
    ViewPostsLikes,
    Recipes,
    Moments,
    Users,
    Favorites,
    Likes,
    Interests,
    Ingredients,
    Steps,
    ViewRecipeStars,
    sequelize,
} = require('../../database/models')
const { controllerWrapper, removeExtension } = require('../../utils/common')
const { paginate } = require('../../database/helper')
const {
    isEditable,
    getRecipeSearchOpts,
    formatOrder,
    recipeResponseData,
    ingredientResponseData, 
    stepResponseData,
    responseData,
} = require('./helper')
const { HttpStatusError } = require('../../errors/httpStatusError')
const { messages } = require('./messages')
const { POST_TYPE } = require('../../database/constants')
const { s3Provider } = require('../../providers/s3')
const uuid = require('uuid').v4

const includeOpts = (userId, tag = true) => {
    const val = {
        include: [
            {
                model: Posts,
                include: [
                    Users,
                    ViewPostsLikes,
                    {
                        model: Favorites,
                        required: false,
                        where: { userId },
                    },
                    {
                        model: Likes,
                        required: false,
                        where: { userId },
                    },
                ],
            },
        ],
    }
    if (tag) val.include.push({ model: Interests, as: 'Tags' })
    return val
}

module.exports.get_posts_recipe = controllerWrapper(async (req, res) => {
    const userId = req.user.id
    const pagination = req.pagination
    const order = formatOrder(req.query?.order)
    let opts = await getRecipeSearchOpts(req.query?.search, req.query?.tags)
    if (opts.include.length === 0) {
        opts = { ...opts, ...includeOpts(userId) }
    } else {
        opts.include.push(includeOpts(userId, false).include[0])
    }
    if (order) opts.order = [['createdAt', order]]
    opts = { ...opts, ...pagination }
    opts.include.push(ViewRecipeStars)
    const posts = await paginate(Recipes, opts)
    posts.data = posts.data.map((post) => recipeResponseData(post))
    res.json(posts)
})

module.exports.get_posts_recipe_id = controllerWrapper(async (req, res) => {
    const { id } = req.params
    const userId = req.user.id
    const post = await Recipes.findByPk(id, includeOpts(userId))
    if (!post) throw HttpStatusError.notFound(messages.notFound)
    res.json({ data: recipeResponseData(post) })
})

module.exports.post_posts_recipe = controllerWrapper(async (req, res) => {
    const { title, description, tags, ingredients, stepsContent } = req.body
    const userId = req.user.id
    const postId = uuid()
    const stepsFiles = req.files?.steps ?? []
    const steps = stepsContent.map(content => {
        const parsedContent = JSON.parse(content)
        return {
            ...parsedContent,
            file: stepsFiles.find(file => parsedContent.id === removeExtension(file.originalname))
        }
    })
    await sequelize.transaction(async (transaction) => {
        const recipeIngredients = ingredients.map((ingredient) => ({
            id: uuid(),
            recipeId: postId,
            description: ingredient,
        }))
        const recipeSteps = await Promise.all(steps.map(async (step) => {
            const stepId = uuid()
            let key = null
            if(step.file){
                const ext = step.file.mimetype.split('/').pop()
                key = `step-${stepId}.${ext}`
                await s3Provider.upload(key, step.file.buffer)    
            }
            return {
                id: uuid(),
                recipeId: postId,
                description: step.description,
                image: key,
            }
        }))
        let recipeKey = null
        if(req.files?.post){
            const postFile = req.files.post[0]
            const ext = postFile.mimetype.split('/').pop()
            recipeKey = `recipe-${postId}.${ext}`
            await s3Provider.upload(recipeKey, postFile.buffer)
        }
        await Posts.create(
            {
                id: postId,
                madeBy: userId,
                type: POST_TYPE.RECIPE,
            },
            { transaction }
        )
        const recipes = await Recipes.create(
            {
                postId,
                name: title,
                description,
                image: recipeKey,
            },
            { transaction }
        )
        await recipes.addTags(tags, { transaction })
        await Ingredients.bulkCreate(recipeIngredients, { transaction })
        await Steps.bulkCreate(recipeSteps, { transaction })
    })
    const post = await Recipes.findByPk(postId, includeOpts(userId))
    if (!post) throw HttpStatusError.notFound(messages.notFound)
    res.json({ data: recipeResponseData(post) })
})

module.exports.put_posts_recipe_id = controllerWrapper(async (req, res) => {
    const { title, description, tags, ingredients, stepsContent } = req.body
    const userId = req.user.id
    const postId = req.params.id
    const recipe = await Recipes.findByPk(postId, { include: [Posts, Steps] })
    if (!recipe) throw HttpStatusError.notFound(messages.notFound)
    if (recipe.Post.madeBy !== userId)
        throw HttpStatusError.forbidden(messages.notOwner)
    if (!isEditable(recipe.createdAt)) {
        throw HttpStatusError.notFound(messages.notEditable)
    }
    const stepsFiles = req.files?.steps ?? []
    const steps = stepsContent ? stepsContent.map(content => {
        const parsedContent = JSON.parse(content)
        return {
            ...parsedContent,
            file: stepsFiles.find(file => parsedContent.id === removeExtension(file.originalname))
        }
    }) : null
    await sequelize.transaction(async (transaction) => {
    //INGREDIENTS
        if(ingredients){
            const recipeIngredients = ingredients.map((ingredient) => ({
                id: uuid(),
                recipeId: postId,
                description: ingredient,
            }))
            await Ingredients.destroy({ where: { recipeId: postId }, transaction })
            await Ingredients.bulkCreate(recipeIngredients, { transaction })    
        }
        //STEPS
        if(steps){
            await Promise.all(recipe.Steps.map(async step => {
                await s3Provider.delete(step.image)
            }))
            const recipeSteps = await Promise.all(steps.map(async (step) => {
                const stepId = uuid()
                let key
                if(step.file){
                    const ext = step.file.mimetype.split('/').pop()
                    key = `step-${stepId}.${ext}`
                    await s3Provider.upload(key, step.file.buffer)    
                }
                return {
                    id: stepId,
                    recipeId: postId,
                    description: step.description,
                    image: key,
                }
            }))
            await Steps.destroy({ where: { recipeId: postId }, transaction })
            await Steps.bulkCreate(recipeSteps, { transaction })    
        }
        //TAGS
        if(tags){
            await recipe.setTags(tags, { transaction })
        }
        //GENERAL INFORMATION
        let recipeKey
        if(req.files?.post){
            const postFile = req.files.post[0]
            const ext = postFile.mimetype.split('/').pop()
            recipeKey = `recipe-${postId}.${ext}`
            await s3Provider.delete(recipe.image)
            await s3Provider.upload(recipeKey, postFile.buffer)
        }
        await recipe.update(
            {
                name: title,
                description,
                image: recipeKey,
            },
            { transaction }
        )
    })
    const updatedPost = await Recipes.findByPk(postId, includeOpts(userId))
    if (!updatedPost) throw HttpStatusError.notFound(messages.notFound)
    res.json({ data: recipeResponseData(updatedPost) })
})

module.exports.delete_posts_recipe_id = controllerWrapper(async (req, res) => {
    const postId = req.params.id
    const userId = req.user.id
    const recipe = await Recipes.findByPk(postId, { include: [Posts] })
    if (!recipe) throw HttpStatusError.notFound(messages.notFound)
    if (recipe.Post.madeBy !== userId){
        throw HttpStatusError.forbidden(messages.notOwner)
    }
    if(!isEditable(recipe.createdAt)) {
        throw HttpStatusError.notFound(messages.notEditable)
    }
    await sequelize.transaction(async (transaction) => {
        await recipe.setTags([], { transaction })
        await Ingredients.destroy({ where: { recipeId: postId }, transaction })
        await Steps.destroy({ where: { recipeId: postId }, transaction })
        await recipe.destroy({ transaction })
    })
    res.json({ deleted: true })
})

//moments

module.exports.get_posts_moment = controllerWrapper(async (req, res) => {
    const userId = req.user.id

    const pagination = req.pagination
    const order = formatOrder(req.query?.order)
    let opts = { ...includeOpts(userId, false), ...pagination }
    if (order) opts.order = [['createdAt', order]]
    const moments = await paginate(Moments, opts)
    moments.data = moments.data.map(post => responseData(post)) 
    res.json(moments)
 
})

module.exports.get_posts_moment_id = controllerWrapper(async (req, res) => {
    const userId = req.user.id
    const postId = req.params.id
    const moment = await Moments.findByPk(postId, includeOpts(userId, false))
    if (!moment) throw HttpStatusError.notFound(messages.notFound)
    res.json({ data: responseData(moment) })
})

module.exports.post_posts_moment = controllerWrapper(async (req, res) => {
    const { description, image } = req.body
    const userId = req.user.id
    const postId = uuid()

    await sequelize.transaction(async (transaction) => {
        await Posts.create(
            {
                id: postId,
                madeBy: userId,
                type: POST_TYPE.MOMENT,
            },
            { transaction }
        )

        await Moments.create(
            {
                postId,
                description,
                image,
            },
            { transaction }
        )
    })

    const moment = await Moments.findByPk(postId, includeOpts(userId, false))
    if (!moment) throw HttpStatusError.notFound(messages.notFound)
    res.json({ data: responseData(moment) })
})

module.exports.put_posts_moment_id = controllerWrapper(async (req, res) => {
    const { description, image } = req.body
    const userId = req.user.id
    const postId = req.params.id
    const moment = await Moments.findByPk(postId, { include: [Posts] })

    if (!moment) throw HttpStatusError.notFound(messages.notFound)
    if (moment.Post.madeBy !== userId)
        throw HttpStatusError.forbidden(messages.notOwner)
    if (!isEditable(moment.createdAt)) {
        throw HttpStatusError.notFound(messages.notEditable)
    }

    await moment.update(
        {
            description,
            image,
        }
    )

    const updatedMoment = await Moments.findByPk(
        postId,
        includeOpts(userId, false)
    )
    if (!updatedMoment) throw HttpStatusError.notFound(messages.notFound)
    updatedMoment.data = 
    res.json({ data: responseData(updatedMoment) })
})

module.exports.delete_posts_moment_id = controllerWrapper(async (req, res) => {
    const postId = req.params.id
    const userId = req.user.id
    const moment = await Moments.findByPk(postId, { include: [Posts] })

    if (!moment) throw HttpStatusError.notFound(messages.notFound)
    if (moment.Post.madeBy !== userId)
        throw HttpStatusError.forbidden(messages.notOwner)
    if (!isEditable(moment.createdAt)) {
        throw HttpStatusError.notFound(messages.notEditable)
    }
  
    await moment.destroy()

    res.json({ deleted: true })
})


module.exports.get_posts_recipe_steps_id = controllerWrapper(async (req, res) => {
    const {id} = req.params
    const opts = {
        include: [Steps]
    }
    const post = await Recipes.findByPk(id, opts)
    if(!post) throw HttpStatusError.notFound(messages.notFound)
    const steps = post.Steps.map(step => stepResponseData(step))
    res.json({data: steps})
})


module.exports.get_posts_recipe_ingredients_id = controllerWrapper(async (req, res) => {
    const {id} = req.params
    const opts = {
        include: [Ingredients]
    }
    const post = await Recipes.findByPk(id, opts)
    if(!post) throw HttpStatusError.notFound(messages.notFound)
    const ingredients = post.Ingredients.map(ingredient => ingredientResponseData(ingredient))
    res.json({data: ingredients})
})


module.exports.post_posts_favorite_id = controllerWrapper(async (req, res) => {
    const userId = req.user.id
    const id = req.params.id
    const {isFavorite} = req.body
    const opts = {
        include: [
            {
                model: Favorites,
                required: false,
                where: { userId }
            }
        ]
    }
    const post = await Posts.findByPk(id, opts)
    if(!post) throw HttpStatusError.notFound(messages.notFound)
    if(isFavorite && post.Favorites.length === 0){
        await Favorites.create({
            userId,
            postId: id
        })
    }
    else if(!isFavorite && post.Favorites.length > 0){
        await Favorites.destroy({where: {userId, postId: id}})
    }
    res.json({data: isFavorite})
})


module.exports.post_posts_like_id = controllerWrapper(async (req, res) => {
    const userId = req.user.id
    const id = req.params.id
    const {isLiked} = req.body
    const opts = {
        include: [
            {
                model: Likes,
                required: false,
                where: { userId }
            }
        ]
    }
    const post = await Posts.findByPk(id, opts)
    if(!post) throw HttpStatusError.notFound(messages.notFound)
    if(isLiked && post.Likes.length === 0){
        await Likes.create({
            userId,
            postId: id
        })
    }
    else if(!isLiked && post.Likes.length > 0){
        await Likes.destroy({where: {userId, postId: id}})
    }
    res.json({data: isLiked})
})
