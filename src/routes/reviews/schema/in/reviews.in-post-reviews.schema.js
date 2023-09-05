module.exports = {
    type: 'object',
    properties: {
        body: {
            type: 'object',
            properties: {
                recipeId: {
                    type: 'string',
                    format: 'uuid',
                },
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
  