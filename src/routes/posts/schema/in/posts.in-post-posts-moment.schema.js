module.exports = {
    type: 'object',
    properties: {
        body: {
            type: 'object',
            properties: {
                description: {type: 'string'},
                image: {type: 'string'}
            },
            required: ['description', 'image']
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
