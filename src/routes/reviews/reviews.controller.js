
const {Reviews} = require('../../database/models')
const { HttpStatusError } = require('../../errors/httpStatusError')
const { paginate } = require('../../database/helper')
const { controllerWrapper } = require('../../utils/common')
const { messages } = require('../reviews/messages')

const uuid = require('uuid').v4
const { responseData } = require('./helper')



module.exports.get_reviews = controllerWrapper(async (req, res) => {
    const pagination = req.pagination
    const opts = {...pagination}
    let review = await paginate(Reviews, opts)
    review.data = review.data.map(interest => responseData(interest))
    res.json({...review})
})

module.exports.put_reviews_id = controllerWrapper(async (req, res) => {
    const {id}= req.params
    const {content,stars} = req.body

    const review = await Reviews.findByPk(id)
    if(!review) throw HttpStatusError.notFound(messages.notFound)

    await review.update({
        content,stars
    })

    const data = responseData(review)

    res.json({data})
})

module.exports.delete_reviews_id = controllerWrapper(async (req, res) => {
    const {id}= req.params

    const review = await Reviews.findByPk(id)
    if(!review) throw HttpStatusError.notFound(messages.notFound)

    await review.destroy()
    const data = responseData(review)

    res.json({data})
})

module.exports.post_reviews = controllerWrapper(async (req, res) => {

    const {recipeId,content,stars} = req.body
    const { id } = req.user
    const review = await Reviews.create({
        id: uuid(),
        userId: id,
        recipeId,
        content,
        stars
    })
    const data = responseData(review)

    res.json({data})
})