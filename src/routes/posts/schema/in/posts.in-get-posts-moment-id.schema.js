module.exports = {
    type: 'object',
    properties: {
        params: {
            type: 'object',
            properties: {
                id: {type: 'string', format: 'uuid'}
            },
            required: ['id']
        },
        headers: {
            type: 'object'
        },
        body: {
            type: 'object'
        },
       
        query: {
            type: 'object'
        }
       
    }
}