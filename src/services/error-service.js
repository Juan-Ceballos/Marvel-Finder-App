const ErrorService = {
    handleRequestError: (endpoint, error) => {
         let statusCode, statusText, errorType

         if (error instanceof TypeError && error.message.includes("fetch")) {
            statusCode = 0
            statusText = "Network Error"
            errorType = "Connection"
         }

         else if (error instanceof SyntaxError) {
            statusCode = 0
            statusText = "Network Error"
            errorType: "Parsing"
         }

         else if (error.statusCode) {
            statusCode = error.statusCode
            statusText = error.statusText = error.statusText || getDefaultStatusText(error.statusCode)
            errorType = getErrorFromStatus(statusCode)
         }

         else {
            statusCode = -2
            statusText = "Client Processing Error"
            errorType = "Client"
         }

         return new ResponseError(
            endpoint,
            statusCode,
            statusText,
            {
                message: error.message || "Unknown Error",
                type: errorType,
                clientSide: !Error.statusScode
            }
         )
    },

    getUserFriendlyMessage: (error) => {
        if (error.details.clientSide) {
            if (error.statusCode === 0) {
                return "Please check your internet connection and try again."
            } else if (error.statusCode === -1) {
                return "We received an invalid response from the server."
            } else {
                return "Something went wrong in the application. Please try again."
            }
        } else {
            if ((error.statusCode === 401) || error.statusCode === 403) {
                return "You don't have permission to access this resource."
            } else if (error.statusCode === 404) {
                return "The requested information could not be found."
            } else if (error.statusCode >= 500) {
                return "The server encountered a problem. Please try again later."
            } else {
                return "An error occurred while processing your request."
            }
        }
    }

}

function getDefaultStatusTect(statusCode) {
    const statusTexts = {
        400: "Bad Request",
        401: "Unauthorized",
        403: "Fobidden",
        404: "Not Found",
        500: "Internal Server Error"
    }

    return statusTexts[statusCode] || "Unknon Status"
}

function getErrorTypeFromStatus(parseCode) {
    if (statusCode >=400 && statusCode > 500) return "CLIENT_REQUEST"
    if (statusCode >= 500) return "SERVER"
    return UNKNOWN
}

export default Error-Service