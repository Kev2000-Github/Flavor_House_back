const {responseData: countryResponseData} = require('../countries/helper')

module.exports.responseData = (user) => {
    return user ? {
        id: user.id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        sex: user.sex,
        phoneNumber: user.phoneNumber,
        Country: countryResponseData(user.Country),
        Interests: user.Interests ? user.Interests.map(interest => ({
            id: interest.id,
            name: interest.name
        })) : [],
        Info: this.additionalInfoResponseData(user.ViewUserInfo),
        isFollowed: user.Followers ? user.isFollowed() : null,
        avatar: user.avatar,
        step: user.step
    } : null
}

module.exports.additionalInfoResponseData = (userInfo) => {
    return userInfo ? {
        followers: userInfo.followers,
        follows: userInfo.follows,
        posts: userInfo.posts
    } : null
}

module.exports.responseDataShort = (user) => {
    return user ? {
        id: user.id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        avatar: user.avatar,
        Info: this.additionalInfoResponseData(user.ViewUserInfo),
        isFollowed: user.Followers ? user.isFollowed() : null
    }: null
}

module.exports.formatExclude = (excludeString) => {
    if(!excludeString) return []
    return excludeString.split(',')
}