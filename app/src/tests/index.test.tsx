import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import axios from "axios"

import { TestComponent } from "../components"

// https://testing-library.com/docs/react-testing-library/example-intro#full-example
describe("@boots", () => {
  // @@
  it("@tests init", () => {
    expect(1).toBe(1)
  })
  // @@
  it("@fake-api msw online", async () => {
    const res1 = await axios("http://localhost:3001/msw-test")
    const res2 = await axios({
      method: "post",
      url: "http://localhost:3001/v1/auth/login",
    })
    const res3 = await axios({
      method: "post",
      url: "http://localhost:3001/v1/mail/text-message",
    })
    const res4 = await axios({
      method: "post",
      url: "http://localhost:3001/v1/session/122333",
    })

    //
    expect(res1.status).toBe(200)
    expect(res1.data.status).toBe("ok")

    expect(res2.status).toBe(200)
    expect(res2.data).toHaveProperty("token")
    expect(res2.data).toHaveProperty("user")

    expect(res3.status).toBe(201)

    expect(res4.status).toBe(200)
  })
  // @@
  it("@ui-tests init", () => {
    render(<TestComponent text="test" />)
    expect(screen.getByText("test")).toBeInTheDocument()
  })
})
