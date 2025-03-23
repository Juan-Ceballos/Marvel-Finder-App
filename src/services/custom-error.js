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
    RateLimitError
}