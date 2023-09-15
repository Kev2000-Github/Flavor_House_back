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
                },
            },
        },
        params: {
            type: 'object',
            properties: {
                id: { 
                    type: 'string',
                    format: 'uuid'
                }
            },
            required: ['id']
        },
        query: {
            type: 'object'
        },
        headers: {
            type: 'object'
        }
    }
}
