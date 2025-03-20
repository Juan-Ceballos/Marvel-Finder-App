import { describe, it, expect, vi, beforeEach, afterEach} from "vitest"
import marvelAPIService from "../src/services/marvel-api-service.js"
import { marvelComicsAPI } from "../src/services/api.js"
import { ENDPOINTS } from "../src/services/config.js"

// does the fetch and certain expectations from data such as the array length from results in data 
describe("Marvel API Integration Test", () => {
    it("should fetch character data from the Marvel API and return expected structure", 
        async () => {
            const response = await marvelComicsAPI.marvelFetchRequest(ENDPOINTS.characters, {name: "wolverine"})

            expect(response).toBeDefined()
            expect(response.data).toBeDefined()
            expect(Array.isArray(response.data.results)).toBe(true)
            expect(response.data.results.length).toBeGreaterThan(0)
            const character = response.data.results.find((char) => char.name === "Wolverine")
            expect(character).toBeDefined()
        })
})

describe("Marvel Service fetch character by name", () => {
    it("should fetch a character using marvel-api-service", 
        async () => {
            const response = await marvelAPIService.fetchCharacter("wolverine")

            expect(response).toBeDefined()
            expect(response.data).toBeDefined()
            expect(Array.isArray(response.data.results)).toBe(true)
            expect(response.data.results.length).toBeGreaterThan(0)
            const character = response.data.results.find((char) => char.name === "Wolverine")
            expect(character).toBeDefined()
        }
    )
})

