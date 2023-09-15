const multer = require('multer')
const { MB, mimeType } = require('../utils/constants')
const { removeExtension } = require('../utils/common')
const { HttpStatusError } = require('../errors/httpStatusError')
const storage = multer.memoryStorage()

const defaultParams = {
    limit: MB,
    fieldName: '',
    fileNames: [],
}

const fileHandler = (props = defaultParams) => {
    const {limit, fieldName, fileNames} = {...defaultParams, ...props}
    return multer({
        storage, 
        limits: { fileSize: limit },
        fileFilter: (req,  file, cb) => {
            if(file.mimetype.split('/')[0] !== mimeType.image){
                cb(HttpStatusError.badRequest({ code: 'bad_file', message: 'file is not a valid type'}))
            }
            const fileName = removeExtension(file.originalname)
            if(fileNames.includes(fileName)){
                cb(null, true)
            }
            else{
                cb(null, false)
            }
        }}).array(fieldName, fileNames.length)
}

module.exports = {
    fileHandler
}