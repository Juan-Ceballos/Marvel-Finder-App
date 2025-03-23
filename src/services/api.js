import md5 from 'md5'
import {
    APIError,
    ResponseError,
    RateLimitError
} from './custom-error.js'

// wrapper function to abstract away the use of fetch and process involved such as
// calling fetch, managing api keys, handling response, and formatting url 
export const createMarvelAPI = ({
    baseUrl = import.meta.env.VITE_API_BASE_URL,
    publicKey = import.meta.env.VITE_MARVEL_PUBLIC_KEY,
    privateKey = import.meta.env.VITE_MARVEL_PRIVATE_KEY
} = {}) => {
    
    // set up hash using timestamp and keys
    const ts = Date.now()
    const hashInput = ts + privateKey + publicKey
    const hash = md5(hashInput)

    // use endpoint and takes arguments for queries to create url
    const buildUrl = (endpoint, params = {}) => {
        const urlBase = `${baseUrl}${endpoint}`

        // object with timestamp, key, hash for common url and adds extra params at end
        const finalParams = {
            ts: ts,
            apikey: publicKey,
            hash: hash,
            ...params
        }

        const queryParams = []

        for (const[key, value] of Object.entries(finalParams)) {
            if (value !== undefined && value !== null) {
                queryParams.push(`${key}=${value}`)
            }
        }
    
        const queryString = queryParams.length > 0 ? `?${queryParams.join(`&`)}` : ``
        
        // return the final url product and turns to string
        return `${urlBase}${queryString}`
    }
    
    // arrow function for handleResponse
    // async required when using await
    // operations that returns a Promise needs await
    const handleResponse = async (response) => {
        // .ok property on response which is http response object
        if (!response.ok) {
            throw new ResponseError(
                response.url,
                response.status,
                response.statusText,
                await response.json().catch(() => null)
            )
            // if error reposnse catch error data throw Error object
        }
        // got back response
        return response.json()
    };
    
    // request using endpoint
    const request = async(endpoint, params = {}) => {
        try {
            const url = buildUrl(endpoint, params)
            const response = await fetch(url)
            return await handleResponse(response)
        } catch (error) {
            throw new ResponseError(
                endpoint,
                error.statusCode || 500,
                error.statusText || "Internal Server Error",
                {message: error.message || "Unknown Error"}
            )
        }
    }

    return {
        marvelFetchRequest: (endpoint, params) => request(endpoint, params)
    }
}

// API Methods
export const marvelComicsAPI = createMarvelAPI()

export default {
    character: marvelComicsAPI
}