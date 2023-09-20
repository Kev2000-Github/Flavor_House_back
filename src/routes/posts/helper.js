const { timeDifferenceHours } = require('../../utils/common')
const {responseDataShort: userResponseData} = require('../users/helper')
const { enumArray } = require('../../database/helper')
const { ORDER, POST_TYPE } = require('../../database/constants')
const { Interests, Sequelize }  = require('../../database/models')

const responseData = (post) => {
    if(!post) return null
    if(post.Moment || post.Recipe){
        let result = {
            id: post.id,
            description: post.Moment?.description ?? post.Recipe?.description,
            image: post.Moment?.image ?? post.Recipe?.image ?? null,
            type: post.type,
            madeBy: userResponseData(post.User),
            likes: post.getLikes(),
            isLiked: post.Likes.length > 0,
            isFavorite: post.Favorites.length > 0,
            createdAt: post.createdAt
        }
        if(post.Recipe){
            result = {
                ...result,
                title: post.Recipe.name,
                Tags: post.Recipe.Tags ? post.Recipe.Tags.map(tag => tagResponseData(tag)) : null,
                stars: post.Recipe.ViewRecipeStar ? Number(post.Recipe.ViewRecipeStar.stars) : 0,        
            }
            return result
        }
        return result
    }
    return {
        id: post.postId,
        description: post.description,
        image: post.image,
        madeBy: userResponseData(post.Post?.User),
        likes: post.Post.getLikes(),
        isLiked: post.Post?.Likes.length > 0,
        isFavorite: post.Post?.Favorites.length > 0,
        createdAt: post.Post.createdAt
    }
}
module.exports.responseData = responseData

module.exports.recipeResponseData = (recipe) => {
    return recipe ? {
        ...responseData(recipe),
        title: recipe.name,
        Tags: recipe.Tags ? recipe.Tags.map(tag => tagResponseData(tag)) : null,
        stars: recipe.ViewRecipeStar ? Number(recipe.ViewRecipeStar.stars) : 0,
    } : null
}

module.exports.ingredientResponseData = (ingredient) => {
    return ingredient ? {
        id: ingredient.id,
        description: ingredient.description
    } : null
}

module.exports.stepResponseData = (step) => {
    return step ? {
        id: step.id,
        description: step.description,
        image: step.image
    } : null
}

const tagResponseData = (tag) => {
    return tag ? {
        id: tag.id,
        name: tag.name,
        color: tag.color
    } : null
}

module.exports.formatOrder = (order) => {
    if(enumArray(ORDER).includes(order)) return order 
    return ORDER.DESC
}

module.exports.formatType = (type) => {
    if(enumArray(POST_TYPE).includes(type)) return type 
    return null
}

const formatTags = (search) => {
    const searchValues = search.split(';')
    const formattedSearchs = searchValues.map(search => {
        return search.replace(/-/g,' ')
    })
    return formattedSearchs
}

module.exports.getRecipeSearchOpts = async (search, tags) => {
    const {like} = Sequelize.Op
    const { and } = Sequelize
    const formattedSearch = search ? `%${search.replace(/-/g,' ')}%` : null
    const formattedTags = formatTags(tags ?? '')
    const validTags = await Interests.findAll({where: {name: formattedTags}})
    const validTagIds = validTags.map(tag => tag.id)
    let opts = {include: []}
    if(validTags.length > 0){
        opts.include.push({ 
            model: Interests,  
            where: and(validTagIds.map(tagId => ({id: tagId}))),
            required: true
        })
        opts.include.push({
            model: Interests,
            as: 'Tags'
        })
    }
    if(formattedSearch){
        opts.where = {name: {[like]: formattedSearch}}
    }
    return opts
}

module.exports.getMomentSearchOpts = async (search) => {
    const {like} = Sequelize.Op
    const formattedSearch = search ? `#${search}%` : null
    const opts = {}
    if(formattedSearch){
        opts.where = {description: {[like]: formattedSearch}}
    }
    return opts
}

module.exports.isEditable = (createdAt) => {
    const now = new Date()
    const hours = timeDifferenceHours(createdAt, now)
    return hours < 24
}