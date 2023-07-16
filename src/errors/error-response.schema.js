module.exports = {
    type: 'object',
    properties: {
        apiVersion: {type:'string'},
        error: {
            type: 'object',
            properties: {
                status: {type:'number'},
                code: {type:'string'},
                message: {type:'string'}
            }
        }
    },
    additionalProperties: true
}