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
        isFavorite: recipe.Post?.Favorites.length > 0
    } : null
}