module.exports = {
    oneOf: [
        {
            type: 'object',
            properties: {},
            additionalProperties: false
        },
        require('../../../../errors/error-response.schema')
    ]
}