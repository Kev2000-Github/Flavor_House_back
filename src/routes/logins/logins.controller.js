const {Users} = require('../../database/models')
const { messages } = require('./messages')
const bcrypt = require ('bcrypt')
const config = require('../../config')
const jwt = require('jsonwebtoken')
const { HttpStatusError } = require('../../errors/httpStatusError')
const { controllerWrapper } = require('../../utils/common')
const { responseData } = require('../users/helper')

module.exports.post_logins = controllerWrapper(async (req, res) => {

    const {email,password} = req.body

    const user = await Users.findOne({where:{email}})
    if(!user) throw HttpStatusError.notFound(messages.notFound)

    const passwordval = bcrypt.compareSync (password ,user.password)
    if (!passwordval) throw HttpStatusError.notFound(messages.notFound)
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