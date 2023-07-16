const Ajv = require('ajv')
const ajv = new Ajv({allErrors: true})
const addFormats = require('ajv-formats')
const addErrors = require('ajv-errors')
addFormats(ajv)
//8 characters min, 1+ lowercase, 1+ uppercase, 1+ special character, alphanumerical string
ajv.addFormat('password', /^[a-zA-Z0-9_@#$%^*()-]{8,}$/)
//no number nor special characters
ajv.addFormat('fullName', /^[a-zA-Z]+( [a-zA-Z]+)*$/)
//no spaces in username
ajv.addFormat('username', /^[a-zA-Z0-9_@#$%^*()-]+$/)
addErrors(ajv)

module.exports = {
    PORT: process.env.PORT ?? 3000,
    JWT_TOKEN: process.env.JWT_PRIVATE_TOKEN ?? 'private_key',
    ajv: ajv
}