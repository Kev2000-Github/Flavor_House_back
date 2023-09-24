
const {Reviews, Users} = require('../../database/models')
const { HttpStatusError } = require('../../errors/httpStatusError')
const { paginate } = require('../../database/helper')
const { controllerWrapper } = require('../../utils/common')
const { messages } = require('../reviews/messages')

const uuid = require('uuid').v4
const { responseData } = require('./helper')

module.exports.get_reviews = controllerWrapper(async (req, res) => {
    const pagination = req.pagination
    const recipeId = req.params.recipeId
    const opts = {
        where: {recipeId},
        ...pagination,
        include: [Users]
    }
    let review = await paginate(Reviews, opts)
    review.data = review.data.map(review => responseData(review))
    res.json({...review})
})

module.exports.put_reviews_id = controllerWrapper(async (req, res) => {
    const {id}= req.params
    const {content,stars} = req.body
    const review = await Reviews.findByPk(id, {include: [Users]})
    if(!review) throw HttpStatusError.notFound(messages.notFound)

    await review.update({
        content,stars
    })

    const data = responseData(review)

    res.json({data})
})

module.exports.delete_reviews_id = controllerWrapper(async (req, res) => {
    const {id}= req.params

    const review = await Reviews.findByPk(id, {include: [Users]})
    if(!review) throw HttpStatusError.notFound(messages.notFound)

    await review.destroy()
    const data = responseData(review)

    res.json({data})
})

module.exports.post_reviews = controllerWrapper(async (req, res) => {

    const {recipeId,content,stars} = req.body
    const { id } = req.user
    const prevReview = await Reviews.findOne({where: {userId: id}})
    if(prevReview) throw HttpStatusError.forbidden(messages.alreadyReviewed)
    const reviewId = uuid()
    await Reviews.create({
        id: reviewId,
        userId: id,
        recipeId,
        content,
        stars
    })
    const review = await Reviews.findByPk(reviewId, {include: [Users]})
    const data = responseData(review)

    res.json({data})
})