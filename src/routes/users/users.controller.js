
const { controllerWrapper } = require('../../utils/common')
const {Users, Interests, Countries, ViewUserInfo, sequelize, Followers, Sequelize} = require('../../database/models')
const { paginate } = require('../../database/helper')
const { HttpStatusError } = require('../../errors/httpStatusError')
const { messages } = require('./messages')
const config = require('../../config')
const uuid = require('uuid').v4
const jwt = require('jsonwebtoken')
const {responseData} = require('./helper')

const includeOpts = {include: [Interests, Countries]}

const commonQueryURLIncludeOptions = (params, userId) => {
    const additionalInfo = params.additionalInfo
    const checkFollow = params.checkFollow
    const includeOptions = {include: [...includeOpts.include]}
    if(additionalInfo) includeOptions.include.push(ViewUserInfo)
    if(checkFollow) {
        includeOptions.include.push({
            model: Followers,
            where: {followedBy: userId},
            required: false
        })
    }
    return includeOptions
}

module.exports.get_users = controllerWrapper(async (req, res) => {
    const { Op } = Sequelize
    const pagination = req.pagination
    const search = req.query.search
    const includeOptions = commonQueryURLIncludeOptions(req.query, req.user.id)
    const opts = {...pagination, ...includeOptions}
    if(search) opts.where = { username: {
        [Op.like]: `%${search}%`
    } }
    let users = await paginate(Users, opts)
    users.data = users.data.map(user => responseData(user))
    res.json({...users})
})

module.exports.get_users_id = controllerWrapper(async (req, res) => {
    const {id} = req.params
    const includeOptions = commonQueryURLIncludeOptions(req.query, req.user.id)
    const user = await Users.findByPk(id, includeOptions)
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
            expiresIn: '7d',
        }
    )
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

module.exports.post_users_follow_id = controllerWrapper(async (req, res) => {
    const {id} = req.params
    const {follow} = req.body
    const userId = req.user.id
    const user = await Users.findByPk(id)
    if(!user) throw HttpStatusError.notFound(messages.notFound)    
    const follower = await Followers.findOne({where: {userId: id, followedBy: userId}})
    if(follow && !follower){
        await Followers.create({userId: id, followedBy: userId})
    }
    else if(!follow && follower){
        await follower.destroy({force: true})
    }
    res.json({data: {follow}})
})
