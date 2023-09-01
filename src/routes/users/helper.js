const {responseData: countryResponseData} = require('../countries/helper')

module.exports.responseData = (user) => {
    return {
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
        avatar: user.avatar,
        step: user.step
    }
}

module.exports.responseDataShort = (user) => {
    return {
        id: user.id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        avatar: user.avatar
    }
}