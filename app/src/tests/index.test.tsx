import React from "react"
import "@testing-library/jest-dom"
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
// import userEvent from "@testing-library/user-event"
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
    const res = await axios("/msw-test")
    expect(res.status).toBe(200)
    expect(res.data.status).toBe("ok")
  })
  // @@
  it("@ui-tests init", () => {
    render(<TestComponent text="test" />)
    expect(screen.getByText("test")).toBeInTheDocument()
  })
})
