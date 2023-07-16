module.exports = {
    oneOf: [
        {
            type: 'object',
            properties: {
                status: {
                    type: 'number'
                }
            },
            additionalProperties: false
        },
        require('../../errors/error-response.schema')
    ]
}