import { has } from "../../util"

describe("@util tests", () => {
  // @@
  describe("@has(node, field);", () => {
    it("checks object has own property", () => {
      const node = { a: 1 }
      const chNode = Object.create(node)
      expect(has(node, "a")).toBe(true)
      expect(has(chNode, "a")).toBe(false)
      expect(has(null, "a")).toBe(false)
    })
  })
})
