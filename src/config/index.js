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
//only number code
ajv.addFormat('recoverycode', /^\d{6}$/)
addErrors(ajv)

module.exports = {
    PORT: process.env.PORT ?? 3000,
    JWT_TOKEN: process.env.JWT_PRIVATE_TOKEN ?? 'private_key',
    ajv: ajv,
    mail: {
        service: process.env.EMAIL_SERVICE,
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
        sender: process.env.EMAIL_SENDER,
        from: process.env.EMAIL_FROM
    },
    S3: {
        region: process.env.AWS_REGION,
        endpoint: process.env.AWS_ENDPOINT,
        bucket: process.env.AWS_BUCKET,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        }
    }
}