const { timeDifferenceHours } = require('../../utils/common')
const {responseDataShort: userResponseData} = require('../users/helper')

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

module.exports.isEditable = (createdAt) => {
    const now = new Date()
    const hours = timeDifferenceHours(createdAt, now)
    return hours < 24
}