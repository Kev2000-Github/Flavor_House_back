const { timeDifferenceHours } = require('../../utils/common')
const {responseDataShort: userResponseData} = require('../users/helper')
const { enumArray } = require('../../database/helper')
const { ORDER } = require('../../database/constants')
const { Interests, Sequelize }  = require('../../database/models')

module.exports.responseData = (recipe) => {
    return recipe ? {
        id: recipe.postId,
        title: recipe.name,
        description: recipe.description,
        image: recipe.image,
        madeBy: userResponseData(recipe.Post?.User),
        likes: recipe.Post.getLikes(),
        isLiked: recipe.Post?.Likes.length > 0,
        isFavorite: recipe.Post?.Favorites.length > 0,
        Tags: recipe.Tags ? recipe.Tags.map(tag => tagResponseData(tag)) : null
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
    const { or } = Sequelize
    const formattedSearch = search ? `%${search.replaceAll('-',' ')}%` : null
    const formattedTags = formatTags(tags ?? '')
    const validTags = await Interests.findAll({where: {name: formattedTags}})
    const validTagIds = validTags.map(tag => tag.id)
    let opts = {include: []}
    if(validTags.length > 0){
        opts.include.push({ 
            model: Interests,  
            as: 'Tags',  
            where: or(validTagIds.map(tagId => ({id: tagId}))),
            required: true
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