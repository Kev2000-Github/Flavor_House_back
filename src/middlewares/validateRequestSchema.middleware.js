const {ajv} = require('../config')
const { HttpStatusError } = require('../errors/httpStatusError')
const { controllerWrapper, errorFormatter } = require('../utils/common')

const validateRequestSchema = schema => controllerWrapper((req, res, next) => {
    const {body, params, query, headers} = req
    const validate = ajv.compile(schema)
    const valid = validate({body, params, query, headers})
    if(!valid) throw HttpStatusError.badRequest({ message: errorFormatter(validate.errors), code: 'schema_error'})
    next()
})

module.exports = {
    validateRequestSchema
}