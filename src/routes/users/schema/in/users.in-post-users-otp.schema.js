module.exports = {
    type: 'object',
    properties: {
        body: {
            type: 'object',
            properties :{
                email: {
                    type: 'string',
                    format: 'email',
                    errorMessage: {
                        format: 'is not in a valid format'
                    }
                },
                code: {
                    type: 'string',
                    format: 'recoverycode',
                    errorMessage: {
                        format: 'is not in a valid format'
                    }
                },
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
  