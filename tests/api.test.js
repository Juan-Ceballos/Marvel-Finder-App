import { describe, test, it, expect, vi, beforeEach, afterEach } from "vitest";
import { createMarvelAPI } from "../src/services/api";

const mockFetch = vi.fn()

const marvelComicsAPI = createMarvelAPI({
    baseUrl: 'https://gateway.marvel.com/v1/public/',
    publicKey: 'test-publick-key',
    privateKey: 'test-private-key'
})

describe('Marvel API Service', () => {
    beforeEach(() => {
        vi.stubGlobal('fetch', mockFetch)
        vi.stubGlobal('console', {...console, error: vi.fn()})
    })

    afterEach(() => {
        vi.unstubAllGlobals()
        vi.clearAllMocks()
    })

    it('should return proper data structure when fetching characters by name', async () => {
        const mockResponseData = {
            data: {
                results: [
                    {id: 1, name: 'Wolverine'},
                    {id: 2, name: 'Spider-Man'}
                ]
            }
        }

        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponseData
        })

        const result = await marvelComicsAPI.getCharacterByName({name: "Wolverine"})

        expect(mockFetch).toHaveBeenCalledTimes(1)
        expect(result).toEqual(mockResponseData)
        expect(result.data).toBeDefined()
        expect(Array.isArray(result.data.results)).toBe(true)
    })

    it('should handle API errors correctly', async () => {
        mockFetch.mockResolvedValueOnce({
            ok: false,
            status: 404,
            json: async () => ({message: 'Character not found'})
        })

        await expect(marvelComicsAPI.getCharacterByName({name: 'Blippy'}))
            .rejects.toThrow('Character not found')
    })

})