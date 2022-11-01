import "@testing-library/jest-dom"
import "whatwg-fetch"
import { expect } from "vitest"
import matchers from "@testing-library/jest-dom/matchers"
import { server } from "./mocks/server.js"

expect.extend(matchers)

// Establish API mocking before all tests.
// eslint-disable-next-line no-undef
beforeAll(() => server.listen())

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
// eslint-disable-next-line no-undef
afterEach(() => server.resetHandlers())

// Clean up after the tests are finished.
// eslint-disable-next-line no-undef
afterAll(() => server.close())
