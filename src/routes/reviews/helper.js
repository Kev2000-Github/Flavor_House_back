const { responseDataShort: userResponseDataShort } = require('../users/helper')

module.exports.responseData = (review) => {
    return review ? {
        id: review.id,
        content: review.content,
        stars: review.stars,
        User: userResponseDataShort(review.User),
        createdAt: review.createdAt,
    } : null
}