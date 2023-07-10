const { controllerWrapper } = require('../../utils/common')

module.exports.get_health = controllerWrapper(async (req, res) => {
    res.json({status: 200})
})