import { useState } from "react"

const useStateSwitch = (initialActive = false) => {
  const [isActive, setIsActive] = useState(initialActive)
  const toggle = () => setIsActive((currentIsActive) => !currentIsActive)
  toggle.on = () => setIsActive(true)
  toggle.off = () => setIsActive(false)

  return { isActive, toggle }
}

export default useStateSwitch
