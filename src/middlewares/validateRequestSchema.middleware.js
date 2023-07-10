const { HttpStatusError } = require("../errors/httpStatusError")
const { controllerWrapper, errorFormatter } = require("../utils/common")
const Ajv = require('ajv')
const ajv = new Ajv({allErrors: true})
const addFormats = require('ajv-formats')
addFormats(ajv)

const validateRequestSchema = schema => controllerWrapper((req, res, next) => {
  const {body, params, query, headers} = req
  const validate = ajv.compile(schema)
  const valid = validate({body, params, query, headers})
  if(!valid) throw HttpStatusError.badRequest({ message: errorFormatter(validate.errors)})
  next()
})

module.exports = {
  validateRequestSchema
}