module.exports.responseData = (comment) => {
    return comment ? {
        id: comment.id,
        content: comment.content,
        createdAt: comment.createdAt,
    } : null
}