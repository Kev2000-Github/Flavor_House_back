module.exports = {
    type: 'object',
    properties: {
        body: {
            type: 'object',
            properties: {
                isLiked: {type: 'boolean'}
            },
            required: ['isLiked']
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
  