const { ERROR_CODES } = require('./constants')
const {version} = require('../../package.json')

const errorHandler = (err, req, res, next) => {
    if(res.headersSent) {
        return next(err)
    }
    if(/^Sequelize/.test(err.name)){
        let errors = ''
        switch(err.name){
        case 'SequelizeForeignKeyConstraintError':
            errors += err.fields.reduce((acc, curr) => {
                return acc + `invalid value ${curr}, `
            }, '')
            break
        default:
            Object.keys(err.errors).forEach((key) => {
                errors += `${err.errors[key].message}, `
            })
        }
        errors = errors.trimEnd().replace(/,$/,'')
        res.status(ERROR_CODES.UNPROCESSABLE_ENTITY)
        res.json({
            apiVersion: version,
            error: {
                status: ERROR_CODES.UNPROCESSABLE_ENTITY,
                code: 'db_error',
                message: errors
            }
        })
    }
    else{
        err.status = err.status ?? ERROR_CODES.INTERNAL_SERVER_ERROR
        res.status(err.status)
        res.json({
            apiVersion: version,
            error: {
                status: err.status,
                code: err.code,
                message: err.message
            }
        })
    }
}

module.exports = {
    errorHandler
}