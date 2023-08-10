const {responseDataShort: userResponseData} = require('../users/helper')

module.exports.responseData = (recipe) => {
    return recipe ? {
        id: recipe.postId,
        title: recipe.name,
        description: recipe.description,
        image: recipe.image,
        madeBy: userResponseData(recipe.Post?.User ?? recipe.ViewPost?.User),
        likes: recipe.ViewPost?.likes,
        isLiked: recipe.ViewPost?.Likes.length > 0,
        isFavorite: recipe.ViewPost?.Favorites.length > 0
    } : null
}