const { HttpStatusError } = require("../errors/httpStatusError")
const { ERROR_TYPES } = require('../errors/constants');

const isJSON = (objStringified) => {
    try{
        const obj = JSON.parse(objStringified)
        return true
    }
    catch(err){
        return false
    }
}

const controllerWrapper = (fn) => {
    return async (req, res, next) => {
        try{
            await fn(req, res, next)
        } catch(err) {
            next(err)
        }
    }
}

const mapObject = (obj, cb) => {
    const objKeys = Object.keys(obj)
    return objKeys.map(cb)
}

const hashPassword = async (saltRounds = 10, password) => {
  return await new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, (err, hash) => {
          if (err) reject(err);
          resolve(hash)
      });
  });
};

const verifyPassword = async (password, hash) => {
    const isSame = await bcrypt.compare(password, hash)
    return isSame
}

/**
* Error formatter to display the ajv errors on the response body
*/
const errorFormatter = errors => {
    return errors.reduce((message, err) => {
        return `${message} ${err.instancePath.replace(/\//g, '')} ${err.message}`
    }, '').trim().replace(/\n/g, '')
}

module.exports = {
    isJSON,
    controllerWrapper,
    mapObject,
    hashPassword,
    verifyPassword,
    errorFormatter
}