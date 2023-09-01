module.exports.responseData = (interest) => {
    return interest ? {
        id: interest.id,
        name: interest.name,
        imageUrl: interest.imageUrl
    } : null
}