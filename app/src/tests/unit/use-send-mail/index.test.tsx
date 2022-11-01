import "@testing-library/jest-dom"
import { describe, it, expect, DoneCallback } from "vitest"
import { render } from "@testing-library/react"

import { TestUseSendMail } from "../../../components"
import { AuthApiProvider, QueryProvider } from "../../../app/providers"

// https://testing-library.com/docs/react-testing-library/example-intro#full-example
describe("@useSendMail", () => {
  it("uses mail service for sending mail", () =>
    new Promise((done: DoneCallback) => {
      render(
        <QueryProvider>
          <AuthApiProvider>
            <TestUseSendMail
              onMail={(res: any) => {
                expect(res.messageId).toBe("test")
                done()
              }}
            />
          </AuthApiProvider>
        </QueryProvider>
      )
    }))
})
