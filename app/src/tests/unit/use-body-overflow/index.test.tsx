import "@testing-library/jest-dom"
import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { TestUseBodyOverflow } from "../../../components"

describe("@useBodyOverflow", () => {
  it("toggles .overflow-hidden class @body element", () => {
    render(<TestUseBodyOverflow />)
    expect(screen.getByTestId("test")).toHaveTextContent("!hidden")
    //
    userEvent.click(screen.getByTestId("overflow:hidden"))
    expect(screen.getByTestId("test")).toHaveTextContent("hidden")
    //
    userEvent.click(screen.getByTestId("overflow:not-hidden"))
    expect(screen.getByTestId("test")).toHaveTextContent("!hidden")
  })
})
