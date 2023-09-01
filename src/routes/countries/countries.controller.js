
const { controllerWrapper } = require('../../utils/common')
const { paginate } = require('../../database/helper')
const {Countries} = require('../../database/models')
const { responseData } = require('./helper')

module.exports.get_countries = controllerWrapper(async (req, res) => {
    const pagination = req.pagination
    const opts = {...pagination}
    let users = await paginate(Countries, opts)
    users.data = users.data.map(user => responseData(user))
    res.json({...users})
})