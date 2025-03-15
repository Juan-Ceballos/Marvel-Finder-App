import md5 from 'md5'

// wrapper function to abstract away the use of fetch and process involved such as
// calling fetch, managing api keys, handling response, and formatting url 
export const createMarvelAPI = (config = {}) => {
    // grab url and keys and set them in variable
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
    const API_MARVEL_PUBLIC_KEY = import.meta.env.VITE_API_MARVEL_PUBLIC_KEY
    const API_MARVEL_PRIVATE_KEY = import.meta.env.VITE_API_MARVEL_PRIVATE_KEY
    
    // possible endpoints
    const COMICS_ENDPOINT = "comics"
    const CHARACTERS_ENDPOINT = "characters"
    
    // set up hash using timestamp and keys
    const ts = Date.now()
    const hashInput = ts + API_MARVEL_PRIVATE_KEY + API_MARVEL_PUBLIC_KEY
    const hash = md5(hashInput)

    // use endpoint and takes arguments for queries to create url
    const buildUrl = (endpoint, params = {}) => {
        const url = new URL(`${API_BASE_URL}${endpoint}`)

        // object with timestamp, key, hash for common url and adds extra params at end
        const finalParams = {
            ts: ts,
            apikey: API_MARVEL_PUBLIC_KEY,
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
            console.error('API request failed:', error)
            throw error
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