module.exports.responseData = (user) => {
    return {
        id: user.id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        sex: user.sex,
        phoneNumber: user.phoneNumber,
        Country: user.Country ? {
            id: user.Country.id,
            name: user.Country.name,
            iso3: user.Country.iso3
        } : null,
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