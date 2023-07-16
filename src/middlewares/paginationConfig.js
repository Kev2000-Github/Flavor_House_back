const { controllerWrapper } = require('../utils/common')

const paginationConfig = controllerWrapper(async (req, res, next) => {
    let {limit= '10', page='0'} = req.query
    limit = Math.floor(Number(limit))
    page = Math.floor(Number(page))
    page = page > 0 ? page - 1 : 0
    limit = limit > 0 ? limit : 1
    const offset = limit * page
    const pagination = {
        limit,
        page,
        offset
    }
    req.pagination = pagination
    next()
})

module.exports = {
    paginationConfig
}