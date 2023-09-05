module.exports = {
    type: 'object',
    properties: {
        body: {
            type: 'object',
            properties: {
                postId: {
                    type: 'string',
                    format: 'uuid',
                },
                content: {
                    type: 'string',
                    maxLength: 250,
                    errorMessage: {
                        format: 'cannot exceed character limit, total 250 characters per review/comment'
                    }
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
  