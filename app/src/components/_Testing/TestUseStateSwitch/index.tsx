import { FC } from "react"
import { useStateSwitch } from "../../../hooks"

export const TestUseStateSwitch: FC = () => {
  const { isActive, toggle } = useStateSwitch()
  return (
    <>
      <h1>TestUseStateSwitch</h1>
      <button data-testid="test" onClick={toggle}>
        {isActive ? "on" : "off"}
      </button>
    </>
  )
}
