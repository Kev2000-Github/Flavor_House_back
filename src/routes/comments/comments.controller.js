
const { controllerWrapper } = require('../../utils/common')
const {Comments, Users} = require('../../database/models')
const { paginate } = require('../../database/helper')
const { responseData } = require('./helper')
const { HttpStatusError } = require('../../errors/httpStatusError')
const messages = require('./messages')
const uuid = require('uuid').v4

module.exports.get_comments = controllerWrapper(async (req, res) => {
    const postId = req.params.postId
    const pagination = req.pagination
    const opts = {
        where: {postId},
        include: [Users],
        ...pagination
    }
    let comments = await paginate(Comments, opts)
    comments.data = comments.data.map(interest => responseData(interest))
    res.json({...comments})
})



module.exports.delete_comments_id = controllerWrapper(async (req, res) => {
    const {id}= req.params

    const comment = await Comments.findByPk(id)
    if(!comment) throw HttpStatusError.notFound(messages.notFound)

    await comment.destroy()
    const data = responseData(comment)

    res.json({data})
})


module.exports.put_comments_id = controllerWrapper(async (req, res) => {
    const {id}= req.params
    const {content} = req.body

    const comment = await Comments.findByPk(id)
    if(!comment) throw HttpStatusError.notFound(messages.notFound)

    await comment.update({
        content
    })

    const data = responseData(comment)

    res.json({data})

})


module.exports.post_comments = controllerWrapper(async (req, res) => {

    const {postId,content} = req.body
    const { id } = req.user
    const comment = await Comments.create({
        id: uuid(),
        userId: id,
        postId,
        content
    })
    const data = responseData(comment)

    res.json({data})

})
