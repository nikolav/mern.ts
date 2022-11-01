import "@testing-library/jest-dom"
import { describe, it, expect } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
// import userEvent from "@testing-library/user-event"

import { TestEmitter, EVENT__EMITTER_TEST } from "../../../components"

// https://testing-library.com/docs/react-testing-library/example-intro#full-example
describe("@use-emitter --global", () => {
  // @@
  it("handles cross-component communication", () => {
    // click on emitter-1; read is-set emitter-2
    render(<TestEmitter />)
    fireEvent.click(screen.getByTestId("emitter1"))
    expect(screen.getByTestId("p2")).toHaveTextContent(EVENT__EMITTER_TEST)
  })
  // @@
  it("handles cross-component communication -2", () => {
    // click on emitter-1; read is-set emitter-2
    render(<TestEmitter />)
    fireEvent.click(screen.getByTestId("emitter2"))
    expect(screen.getByTestId("p1")).toHaveTextContent(EVENT__EMITTER_TEST)
  })
})
