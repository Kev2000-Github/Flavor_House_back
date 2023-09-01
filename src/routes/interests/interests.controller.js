
const { controllerWrapper } = require('../../utils/common')
const { paginate } = require('../../database/helper')
const {Interests} = require('../../database/models')
const { HttpStatusError } = require('../../errors/httpStatusError')
const { messages } = require('./messages')
const { responseData } = require('./helper')

module.exports.get_interests = controllerWrapper(async (req, res) => {
    const pagination = req.pagination
    const opts = {...pagination}
    let interests = await paginate(Interests, opts)
    interests.data = interests.data.map(interest => responseData(interest))
    res.json({...interests})
})

module.exports.get_interests_id = controllerWrapper(async (req, res) => {
    const {id} = req.params
    const interest = await Interests.findByPk(id)
    if(!interest) throw HttpStatusError.notFound(messages.notFound)
    res.json({data: responseData(interest)})
})

/*
module.exports.post_interests = controllerWrapper(async (req, res) => {
    const {name, imageUrl } = req.body
    const interest = await Interests.create({ id: uuid(),  name, imageUrl })
    const data = responseData(interest)
    res.json({data})
})

module.exports.put_interests_id = controllerWrapper(async (req, res) => {
    const {id} = req.params
    const { name, imageUrl } = req.body
    await Interests.findByPk(id)
    if(!user) throw HttpStatusError.notFound(messages.notFound)
    await user.update({ ...userInfo, step: 1 }, {transaction})

    const user = await Interests.findByPk(id, includeOpts)
    res.json({data: responseData(user)})
})

module.exports.delete_interests_id = controllerWrapper(async (req, res) => {
    //your code goes here
})
*/