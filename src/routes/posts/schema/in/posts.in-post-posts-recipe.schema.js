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
                steps: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            description: {type: 'string'},
                            picture: {type: 'string'}
                        }
                    }
                },
                picture: {type: 'string'}
            }
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
  