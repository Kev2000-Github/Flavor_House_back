module.exports = {
    type: 'object',
    properties: {
        body: {
            type: 'object'
        },
        params: {
            type: 'object'
        },
        query: {
            type: 'object',
            properties: {
                additionalInfo: {type: 'string'}
            }
        },
        headers: {
            type: 'object'
        }
    }
}