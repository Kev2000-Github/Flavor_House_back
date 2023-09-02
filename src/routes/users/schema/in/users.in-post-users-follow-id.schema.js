module.exports = {
    type: 'object',
    properties: {
        body: {
            type: 'object',
            properties: {
                follow: {type: 'boolean'}
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
  