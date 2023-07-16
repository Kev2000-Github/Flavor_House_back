
const { controllerWrapper } = require('../../utils/common')
const {Users, Interests, Countries, sequelize} = require('../../database/models')
const { paginate } = require('../../database/helper')
const { HttpStatusError } = require('../../errors/httpStatusError')
const { messages } = require('./messages')
const config = require('../../config')
const uuid = require('uuid').v4
const jwt = require('jsonwebtoken')

const responseData = (user) => {
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
        step: user.step
    }
}

const includeOpts = {include: [Interests, Countries]}

module.exports.get_users = controllerWrapper(async (req, res) => {
    const pagination = req.pagination
    const opts = {...pagination, ...includeOpts}
    let users = await paginate(Users, opts)
    users.data = users.data.map(user => responseData(user))
    res.json({...users})
})

module.exports.get_users_id = controllerWrapper(async (req, res) => {
    const {id} = req.params
    const user = await Users.findByPk(id, includeOpts)
    if(!user) throw HttpStatusError.notFound(messages.notFound)
    res.json({data: responseData(user)})
})

module.exports.post_users = controllerWrapper(async (req, res) => {
    const {fullName, username, password, email, sex, phoneNumber, countryId } = req.body
    const user = await Users.create({
        id: uuid(), 
        fullName, 
        username, 
        password, 
        email, 
        sex, 
        phoneNumber, 
        countryId,
        step: 0
    })
    const data = responseData(user)
    const token = jwt.sign(
        data,
        config.JWT_TOKEN,
        {
          expiresIn: "7d",
        }
      );
    res.json({data, token})
})

module.exports.put_users = controllerWrapper(async (req, res) => {
    const {id} = req.params
    const {fullName, username, password, email, sex, phoneNumber, countryId, interests } = req.body
    const {id: userId} = req.user
    if(id !== userId) throw HttpStatusError.forbidden(messages.forbidden)
    await sequelize.transaction(async transaction => {
        const userInfo = {fullName, username, password, email, sex, phoneNumber, countryId }
        let user = await Users.findByPk(id)
        if(!user) throw HttpStatusError.notFound(messages.notFound)    
        await user.update({ ...userInfo, step: 1 }, {transaction})
        await user.setInterests(interests, {transaction})
    })
    const user = await Users.findByPk(id, includeOpts)
    res.json({data: responseData(user)})
})

module.exports.delete_users = controllerWrapper(async (req, res) => {
    const {id} = req.params
    const {id: userId} = req.user
    if(id !== userId) throw HttpStatusError.forbidden(messages.forbidden)
    const user = await Users.findByPk(id, includeOpts)
    if(!user) throw HttpStatusError.notFound(messages.notFound)
    await user.destroy()
    res.json({data: responseData(user)})
})
