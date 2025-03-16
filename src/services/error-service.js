class APIError extends Error {
    constructor(message, status) {
        super(message)
        this.name = "APIError"
        this.status = status
    }
}

class ResponseError extends APIError {
    constructor(url, statusCode, statusText, response = null, status = statusCode) {
        super(`Request to ${url} failed with status: ${statusCode} ${statusText}`, status)
        this.name = "ResponseError"
        this.url = url
        this.statusCode = statusCode
        this.statusText = statusText
        this.response = response
    }
}

class InvalidURLError extends APIError {
    constructor(url, reason, status = 400) {
        super(`Invalid URL: ${url} - ${reason}`, status)
    }
}

class NotFoundError extends APIError {
    constructor(resource, id, status = 404) {
        super(`${resource} with ID ${id} not found`, status)
        this.name = "NotFoundError"
        this.resource = resource
        this.resourceId = id
    }
}

class ValidationError extends APIError {
    constructor(message, fields, status = 400) {
        super(message, status)
        this.name = "ValidationError"
        this.fields = fields
    }
}

class AuthorizationError extends APIError {
    constructor(message, status = 403) {
        super(message, status)
        this.name = "AuthorizationError"
    }
}

class RateLimitError extends APIError {
    constructor(message, retryAfter, status = 429) {
        super(message, status)
        this.name = "RateLimitError"
        this.retryAfter = retryAfter
    }
}

export {
    APIError,
    ResponseError,
    NotFoundError,
    ValidationError,
    InvalidURLError,
    AuthorizationError,
    RateLimitError
}