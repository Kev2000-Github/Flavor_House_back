const { timeDifferenceHours } = require('../../utils/common')
const {responseDataShort: userResponseData} = require('../users/helper')
const { enumArray } = require('../../database/helper')
const { ORDER } = require('../../database/constants')
const { Interests, Sequelize }  = require('../../database/models')

const responseData = (post) => {
    return post ? {
        id: post.postId,
        description: post.description,
        image: post.image,
        madeBy: userResponseData(post.Post?.User),
        likes: post.Post.getLikes(),
        isLiked: post.Post?.Likes.length > 0,
        isFavorite: post.Post?.Favorites.length > 0,
    } : null
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

const formatTags = (search) => {
    const searchValues = search.split(';')
    const formattedSearchs = searchValues.map(search => {
        return search.replaceAll('-',' ')
    })
    return formattedSearchs
}

module.exports.getRecipeSearchOpts = async (search, tags) => {
    const {like} = Sequelize.Op
    const { and } = Sequelize
    const formattedSearch = search ? `%${search.replaceAll('-',' ')}%` : null
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

module.exports.isEditable = (createdAt) => {
    const now = new Date()
    const hours = timeDifferenceHours(createdAt, now)
    return hours < 24
}