module.exports = {
    type: 'object',
    properties: {
        body: {
            type: 'object',
            properties :{
                password: {
                    type: 'string',
                    format: 'password',
                    errorMessage: {
                        format: 'must have 8 characters, uppercase, lowercase, alphanumerical and special characters'
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
  