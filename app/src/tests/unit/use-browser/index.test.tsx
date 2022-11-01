import "@testing-library/jest-dom"
import { describe, it, expect, DoneCallback } from "vitest"
import { render } from "@testing-library/react"
import { act } from "react-dom/test-utils"

import { TestUseBrowser } from "../../../components"
import { BrowserContextProvider } from "../../../app/providers"

// https://testing-library.com/docs/react-testing-library/example-intro#full-example
describe("@use-browser", () => {
  // @@
  it("access browser dom apis", () =>
    new Promise((done: DoneCallback) => {
      // callback @dom-available
      render(
        <BrowserContextProvider>
          <TestUseBrowser
            onDom={(res: boolean) => {
              expect(res).toBe(true)
              done()
            }}
          />
        </BrowserContextProvider>
      )
    }))
})
