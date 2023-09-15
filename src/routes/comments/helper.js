const { responseDataShort: userResponseDataShort } = require('../users/helper')

module.exports.responseData = (comment) => {
    return comment ? {
        id: comment.id,
        content: comment.content,
        User: userResponseDataShort(comment.User),
        createdAt: comment.createdAt,
    } : null
}