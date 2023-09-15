module.exports = {
    type: 'object',
    properties: {
        body: {
            type: 'object',
            properties: {
                description: {
                    type: 'string',
                    minLength: 10,
                    maxLength: 500
                }
            },
            required: ['description']
        },
        params: {
            type: 'object'
        },
        query: {
            type: 'object'
        },
        headers: {
            type: 'object'
        }
    }
}
