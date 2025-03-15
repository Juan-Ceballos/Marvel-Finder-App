import { describe, it, expect } from "vitest"
import { createMarvelAPI } from "../src/services/api"

// setup marvelComicsAPI wraper object
const marvelComicsAPI = createMarvelAPI({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    publicKey: import.meta.env.VITE_API_MARVEL_PUBLIC_KEY,
    privateKey: import.meta.env.VITE_API_MARVEL_PRIVATE_KEY
})

// does the fetch and certain expectations from data such as the array length from results in data 
describe("Marvel API Integration Test", () => {
    it("should fetch character data from the Marvel API and return expected structure", 
        async () => {
            const response = await marvelComicsAPI.getCharacterByName({name: "Wolverine"})

            expect(response).toBeDefined()
            expect(response.data).toBeDefined()
            expect(Array.isArray(response.data.results)).toBe(true)
            expect(response.data.results.length).toBeGreaterThan(0)
            const character = response.data.results.find((char) => char.name === "Wolverine")
            expect(character).toBeDefined()
        })
})