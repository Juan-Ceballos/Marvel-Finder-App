//import md5 = require("md5")

const API_BASE_URL = import.meta.env.API_BASE_URL
const API_MARVEL_PUBLIC_KEY = import.meta.env.API_MARVEL_PUBLIC_KEY
const API_MARVEL_PRIVATE_KEY = import.meta.env.API_MARVEL_PRIVATE_KEY

const COMICS_ENDPOINT = "comics"
const CHARACTERS_ENDPOINT = "characters"

const ts = Date.now()
const hashInput = ts + API_MARVEL_PRIVATE_KEY + API_MARVEL_PUBLIC_KEY
const hash = Crypto.MD5(hashInput).toString()

const buildUrl = (endpoint, params = {}) => {
    const url = new URL(`${API_BASE_URL}${endpoint}`)

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            url.searchParams.append(key, value)
        }
    })
    
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

// API Methods
export const marvelComicsAPI = {
    getCharacterByName: (params) => request(CHARACTERS_ENDPOINT, params)
}

export default {
    character: marvelComicsAPI
}