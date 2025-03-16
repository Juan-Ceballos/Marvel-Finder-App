import { marvelComicsAPI } from "./api"

// class for all necessary fetch request singleton pattern
class MarvelAPIService {
    
    static instance = null

    constructor() {
        if (MarvelAPIService.instance) {
            return MarvelAPIService.instance
        }
        MarvelAPIService.instance = this
    }

    async fetchCharacter (name) {
        const response = await marvelComicsAPI.getCharacterByName({name})
        console.log("Here's your response", response)
        return response
    }
}

const marvelAPIService = new MarvelAPIService()
export default marvelAPIService