const {Users, Countries} = require('../../database/models')
const { messages } = require('./messages')
const config = require('../../config')
const jwt = require('jsonwebtoken')
const { HttpStatusError } = require('../../errors/httpStatusError')
const { controllerWrapper, verifyPassword } = require('../../utils/common')
const { responseData } = require('../users/helper')

module.exports.post_logins = controllerWrapper(async (req, res) => {

    const {email,password} = req.body

    const user = await Users.findOne({where:{email}, include: [Countries] })
    if(!user) throw HttpStatusError.notFound(messages.notFound)
    
    if (!(await verifyPassword(password,user.password))) throw HttpStatusError.notFound(messages.notFound)
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