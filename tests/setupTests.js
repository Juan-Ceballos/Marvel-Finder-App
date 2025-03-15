import { vi } from "vitest"

// allows a global sub for console error on all test files
// have to modify in vite.config.js then can remove from tests
vi.stubGlobal("console", {...console, error: vi.fn})

export default {
    setupFiles: "./tests/setupTests.js"
}