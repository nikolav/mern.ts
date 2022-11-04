import "@testing-library/jest-dom"
import { describe, it, expect } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"

import { TestUseStateSwitch } from "../../../components"

describe("@useStateSwitch", () => {
  // @@
  it("switches state flag", () => {
    render(<TestUseStateSwitch />)
    const button = screen.getByTestId("test")
    expect(button).toHaveTextContent("off")
    fireEvent.click(button)
    expect(button).toHaveTextContent("on")
  })
})
