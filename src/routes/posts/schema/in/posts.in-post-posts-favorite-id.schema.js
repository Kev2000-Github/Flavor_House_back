module.exports = {
    type: 'object',
    properties: {
        body: {
            type: 'object',
            properties: {
                isFavorite: {type: 'boolean'}
            },
            required: ['isFavorite']
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
  