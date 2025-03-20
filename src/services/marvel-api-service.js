import { MarvelCharacter } from "../models/marvel-character"
import { marvelComicsAPI } from "./api"
import { ENDPOINTS } from "./config"

const popularCharacters = ["groot", "jean grey", "thor", "doctor doom", "winter soldier", "blade", 
    "punisher", "gambit", "cyclops", "rogue", "doctor strage", "hawkeye", "black widow", "daredevil",
    "storm", "black panther", "scarlet witch", "magneto", "deadpool", "captain america", "loki",
    "iron man", "thanos", "hulk", "wolverine"
]

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
        try {
            const characterByNameResponse = await marvelComicsAPI.marvelFetchRequest(ENDPOINTS.characters, {name})
            return characterByNameResponse
        } catch (error) {
            throw new Error('Network Error during fetch for parsing', error)
        }
    }

    async parseCharacter(name) {
        try {
            const characterResponse = await this.fetchCharacter(name)
            if (characterResponse.data.results.length === 0) {
                throw new Error(`No character found with name: ${name}`)
            }
            const resultCharacter = characterResponse.data.results[0]
            const marvelCharacter = new MarvelCharacter(resultCharacter)
            return marvelCharacter
        } catch(error) {
            throw new Error("error parsing", error)
        }
    }

    async parsePopularCharacters(names) {
        try {
            const popularCharacters = await Promise.all(
                names.map(name => this.parseCharacter(name))
            )
            return popularCharacters
        } catch(error) {
            throw new Error("error parsing characters into array", error)
        }
    }

}

const marvelAPIService = new MarvelAPIService()
export default marvelAPIService