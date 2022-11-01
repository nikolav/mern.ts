import "@testing-library/jest-dom"
import { describe, it, expect, DoneCallback } from "vitest"
import { render } from "@testing-library/react"

import { TestUseAuthApi } from "../../../components"
import { QueryProvider } from "../../../app/providers"
import { AuthApiProvider } from "../../../hooks/use-auth-api"

describe("@useAuthApi", () => {
  // @@
  it("uses auth servcie to authenticate user", () =>
    new Promise((done: DoneCallback) => {
      //
      render(
        <QueryProvider>
          <AuthApiProvider>
            <TestUseAuthApi
              onUser={(isAuth: any) => {
                expect(isAuth).toBe(true)
                done()
              }}
            />
          </AuthApiProvider>
        </QueryProvider>
      )
    }))
})
