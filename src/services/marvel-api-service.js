import { MarvelCharacter } from "../models/marvel-character"
import { marvelComicsAPI } from "./api"

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
            const character = await marvelComicsAPI.getCharacterByName({name})
            return character
        } catch (error) {
            throw new Error('Network Error during fetch for parsing', error)
        }
        //mcomicsAPI = object wiht properties getCharacterByName
    }

    // async fetchCharacter (name) {
    //     try {
    //         const response = await marvelComicsAPI.getCharacterByName(name)

    //         if (!response.ok) {
    //             throw new Error('Network Error during parsing')
    //         }
    //         // is this redundant if i get back response.json() from handle response
    //         const data = await response.json()
    //         const marvelCharacter = new MarvelCharacter(data)
    //         if (!marvelCharacter) {
    //             throw new Error('error parsing character to object')
    //         }
    
    //         return marvelCharacter
    //     } catch (error) {
    //         console.error('Error fetching character:', error)
    //         throw error
    //     }    
    // }
}

const marvelAPIService = new MarvelAPIService()
export default marvelAPIService