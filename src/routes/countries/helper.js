module.exports.responseData = (country) => {
    return country ? {
        id: country.id,
        name: country.name,
        iso3: country.iso3
    } : null
}