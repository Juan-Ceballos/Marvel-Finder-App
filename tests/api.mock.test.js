import { describe, test, it, expect, vi, beforeEach, afterEach } from "vitest";
import { createMarvelAPI } from "../src/services/api";
import { ResponseError } from "../src/services/error-service";

// mocks fetch request
const mockFetch = vi.fn()

// setsup your marvelAPI wrapper
const marvelComicsAPI = createMarvelAPI({
    baseUrl: 'https://gateway.marvel.com/v1/public/',
    publicKey: 'test-publick-key',
    privateKey: 'test-private-key'
})

// describe test and sets up what is needed before and resets after
describe('Marvel API Service', () => {
    beforeEach(() => {
        vi.stubGlobal('fetch', mockFetch)
    })

    afterEach(() => {
        vi.unstubAllGlobals()
        vi.clearAllMocks()
    })

    // what should be expected structure of the response
    it('should return proper data structure when fetching characters by name', async () => {
        const mockResponseData = {
            data: {
                results: [
                    {id: 1, name: 'Wolverine'},
                    {id: 2, name: 'Spider-Man'}
                ]
            }
        }

        // expected results if resolved
        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponseData
        })

        // the fetch request 
        const result = await marvelComicsAPI.getCharacterByName({name: "Wolverine"})

        // expectatations 
        expect(mockFetch).toHaveBeenCalledTimes(1)
        expect(result).toEqual(mockResponseData)
        expect(result.data).toBeDefined()
        expect(Array.isArray(result.data.results)).toBe(true)
    })

    // now if error
    it('should handle API errors correctly', async () => {
        mockFetch.mockResolvedValueOnce({
            ok: false,
            status: 404,
            statusText: "Not Found",
            url: "https://api.example.com/characters",
            json: async () => ({message: 'Character not found'})
        })

        await expect(marvelComicsAPI.getCharacterByName({name: 'Blippy'}))
            .rejects.toThrow(ResponseError)
    })

})