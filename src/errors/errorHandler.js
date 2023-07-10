const { ERROR_CODES } = require("./constants")
const {version} = require('../../package.json')
const errorHandler = (err, req, res, next) => {
    if(res.headersSent) {
        return next(err)
    }
    console.error(err)
    if(err.name === 'ValidationError'){
        let errors = ""
        Object.keys(err.errors).forEach((key) => {
          errors += `${key}: ${err.errors[key].message} `;
        });
        res.status(ERROR_CODES.UNPROCESSABLE_ENTITY)
        res.json({
            apiVersion: version,
            error: {
                code: ERROR_CODES.UNPROCESSABLE_ENTITY,
                message: errors
            }
        })
    }
    else{
        res.status(err.code)
        res.json({
            apiVersion: version,
            error: {
                code: err.code,
                message: err.message
            }
        })
    }
}

module.exports = {
    errorHandler
}