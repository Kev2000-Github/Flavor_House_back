
const { s3Provider } = require('../../providers/s3')
const { controllerWrapper } = require('../../utils/common')
const {Readable} = require('stream')

module.exports.get_picturers_picture_display_key = controllerWrapper(async (req, res) => {
    const { key } = req.params
    const {content, mime} = await s3Provider.download(key, false)
    const stream = Readable.from(content)
    res.setHeader('Content-Type', mime)
    stream.pipe(res)
})