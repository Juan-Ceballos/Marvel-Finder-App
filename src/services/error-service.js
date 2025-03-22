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
            endpoint
            statusCode
            statusText
            {
                message: error.message || "Unknown Error",
                type: errorType,
                clientSide: !Error.statusScode
            }
         )
    }

    getUserFriendlyMessage: (error) => {

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