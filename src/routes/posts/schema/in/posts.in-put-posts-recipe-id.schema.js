module.exports = {
    type: 'object',
    properties: {
        body: {
            type: 'object',
            properties: {
                title: {type: 'string'},
                description: {type: 'string'},
                tags: {
                    type: 'array',
                    items: {
                        type: 'string',
                        format: 'uuid'
                    }
                },
                ingredients: {
                    type: 'array',
                    items: { type: 'string' }
                },
                stepsContent: {
                    type: 'array',
                    items: { type: 'string'}
                },
            },
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
  