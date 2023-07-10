const { ERROR_CODES } = require('./constants')

class HttpStatusError extends Error {
    constructor(
        code,
        message
    ) {
        super(message)
        this.code = code
    }

    static notFound({message}) {
        return new HttpStatusError(ERROR_CODES.NOT_FOUND, message)
    }

    static badRequest ({message}) {
        return new HttpStatusError(ERROR_CODES.BAD_REQUEST, message)
    }

    static forbidden ({message}) {
        return new HttpStatusError(ERROR_CODES.FORBIDDEN, message)
    }

    static unauthorize ({message}) {
        return new HttpStatusError(ERROR_CODES.UNAUTHORIZED, message)
    }

    static internalServerError ({message}) {
        return new HttpStatusError(ERROR_CODES.INTERNAL_SERVER_ERROR, message)
    }

    static unprocesableEntity ({message}) {
        return new HttpStatusError(ERROR_CODES.UNPROCESSABLE_ENTITY, message)
    }
}

module.exports = {
    HttpStatusError
}