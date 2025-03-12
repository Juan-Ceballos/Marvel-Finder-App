const API_BASE_URL = import.meta.env.API_BASE_URL

// arrow function for handleResponse
// async required when using await
// operations that returns a Promise needs await
const handleResponse = async (response) => {
    // .ok property on response which is http response object
    if (!response.ok) {
        // if error reposnse catch error data throw Error object
        const errorData = await response.json().catch(() => null)
        throw new Error(errorData?.message || `API error: ${response.status}`)
    }
    // got back response
    return response.json()
}

const request = async (endpoint, options = {}) => {
    const defaultOptions = {

    }
}