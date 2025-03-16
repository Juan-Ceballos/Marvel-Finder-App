import md5 from 'md5'
import {
    APIError,
    NotFoundError,
    ValidationError,
    InvalidURLError,
    AuthorizationError,
    RateLimitError
} from './error-service.js'


// wrapper function to abstract away the use of fetch and process involved such as
// calling fetch, managing api keys, handling response, and formatting url 
export const createMarvelAPI = ({
    baseUrl = import.meta.env.VITE_API_BASE_URL,
    publicKey = import.meta.env.VITE_API_MARVEL_PUBLIC_KEY,
    privateKey = import.meta.env.VITE_API_MARVEL_PRIVATE_KEY
} = {}) => {
    // possible endpoints
    const COMICS_ENDPOINT = "comics"
    const CHARACTERS_ENDPOINT = "characters"
    
    // set up hash using timestamp and keys
    const ts = Date.now()
    const hashInput = ts + privateKey + publicKey
    const hash = md5(hashInput)

    // use endpoint and takes arguments for queries to create url
    const buildUrl = (endpoint, params = {}) => {
        const url = new URL(`${baseUrl}${endpoint}`)

        // object with timestamp, key, hash for common url and adds extra params at end
        const finalParams = {
            ts: ts,
            apikey: publicKey,
            hash: hash,
            ...params
        }
    
        // adds parameters to url
        Object.entries(finalParams).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                url.searchParams.append(key, value)
            }
        })
        
        // return the final url product and turns to string
        return url.toString()
    }
    
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
    };
    
    // request using endpoint
    const request = async(endpoint, params = {}) => {
        try {
            const url = buildUrl(endpoint, params)
            const response = await fetch(url)
            return await handleResponse(response)
        } catch (error) {
            throw new APIError("Character not found", error.status || 500)
        }
    }

    return {
        getCharacterByName: (params) => request(CHARACTERS_ENDPOINT, params)
    }
}

// API Methods
export const marvelComicsAPI = createMarvelAPI()

export default {
    character: marvelComicsAPI
}