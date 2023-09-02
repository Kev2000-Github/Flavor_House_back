module.exports = {
    type: 'object',
    properties: {
        body: {
            type: 'object'
        },
        params: {
            type: 'object'
        },
        query: {
            type: 'object',
            properties: {
                additionalInfo: {type: 'string'},
                checkFollow: {type: 'string'},
                search: {type: 'string'},
                limit: {type: 'string'},
                page: {type: 'string'},
            }
        },
        headers: {
            type: 'object'
        }
    }
}