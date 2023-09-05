module.exports = {
    type: 'object',
    properties: {
        body: {
            type: 'object',
            properties: {
                content: {
                    type: 'string',
                    maxLength: 250,
                    errorMessage: {
                        format: 'cannot exceed character limit, total 250 characters per review/comment'
                    }
                },                
                stars: {
                    type: 'number',
                    maximum: 5,
                    minimum: 0,
                }
            }
        },
        params: {
            type: 'object',
            properties: {
                id: {type: 'string'}
            }
        },
        query: {
            type: 'object'
        },
        headers: {
            type: 'object'
        }
    }
}
  