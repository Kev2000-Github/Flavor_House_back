const { ERROR_CODES } = require('./constants')

class HttpStatusError extends Error {
    constructor(
        status,
        code,
        message
    ) {
        super(message)
        this.code = code
        this.status = status
    }

    static notFound({message, code}) {
        code = code ?? "default_error"
        return new HttpStatusError(ERROR_CODES.NOT_FOUND, code, message)
    }

    static badRequest ({message, code}) {
        code = code ?? "default_error"
        return new HttpStatusError(ERROR_CODES.BAD_REQUEST, code, message)
    }

    static forbidden ({message, code}) {
        code = code ?? "default_error"
        return new HttpStatusError(ERROR_CODES.FORBIDDEN, code, message)
    }

    static unauthorize ({message, code}) {
        code = code ?? "default_error"
        return new HttpStatusError(ERROR_CODES.UNAUTHORIZED, code, message)
    }

    static internalServerError ({message, code}) {
        code = code ?? "default_error"
        return new HttpStatusError(ERROR_CODES.INTERNAL_SERVER_ERROR, code, message)
    }

    static unprocesableEntity ({message, code}) {
        code = code ?? "default_error"
        return new HttpStatusError(ERROR_CODES.UNPROCESSABLE_ENTITY, code, message)
    }
}

module.exports = {
    HttpStatusError
}