module.exports.responseData = (interest) => {
    return interest ? {
        id: interest.id,
        name: interest.name,
        imageUrl: interest.imageUrl,
        color: interest.color
    } : null
}