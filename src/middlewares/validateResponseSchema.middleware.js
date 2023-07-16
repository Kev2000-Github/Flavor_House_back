const {ajv} = require("../config")
const { HttpStatusError } = require("../errors/httpStatusError")
const { controllerWrapper, errorFormatter } = require("../utils/common")

const validateResponseSchema = schema => controllerWrapper((req, res, next) => {
  const validate = ajv.compile(schema)
  res.json = (_super => {
    return function (data) {
      if(!validate(data)) throw HttpStatusError.badRequest({ message: errorFormatter(validate.errors), code: "schema_error"})
      return _super.call(this, data)
    }
  })(res.json)
  next()
})

module.exports = {
  validateResponseSchema
}