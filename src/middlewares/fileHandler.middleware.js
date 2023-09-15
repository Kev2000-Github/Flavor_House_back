const multer = require('multer')
const { MB, mimeType } = require('../utils/constants')
const { removeExtension } = require('../utils/common')
const { HttpStatusError } = require('../errors/httpStatusError')
const storage = multer.memoryStorage()

const defaultParams = {
    limit: MB,
    fields: [{name: '', fileNames: []}],
}

const fileHandler = (props = defaultParams) => {
    const {limit, fields} = {...defaultParams, ...props}
    return multer({
        storage, 
        limits: { fileSize: limit },
        fileFilter: (req,  file, cb) => {
            const currentField = fields.find(field => field.name === file.fieldname)
            if(!currentField) {
                return cb(HttpStatusError.badRequest({ code: 'bad_field', message: 'field not allowed'}))
            }
            if(file.mimetype.split('/')[0] !== mimeType.image){
                return cb(HttpStatusError.badRequest({ code: 'bad_file', message: 'file is not a valid type'}))
            }
            if(currentField.fileNames.length === 0){
                return cb(null, true)
            }
            const fileName = removeExtension(file.originalname)
            if(currentField.fileNames.includes(fileName)){
                return cb(null, true)
            }
            else{
                return cb(null, false)
            }
        }}).fields(fields.map(val => ({
        ...val, 
        maxCount: val.fileNames.length === 0 ? undefined : val.fileNames.length
    })))
}

module.exports = {
    fileHandler
}