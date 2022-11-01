import { useState, useEffect } from "react"
import { assign } from "../util"
import { OVERFLOW_HIDDEN_CLASS } from "../app/store"

const useBodyOverflow = () => {
  const [overflowHidden, setOverflowHidden] = useState(false)
  //
  useEffect(() => {
    try {
      setOverflowHidden(document.body.classList.contains(OVERFLOW_HIDDEN_CLASS))
    } catch (error) {}
  }, [])
  useEffect(() => {
    try {
      if (overflowHidden) {
        document.body.classList.add(OVERFLOW_HIDDEN_CLASS)
        return
      }
      //
      document.body.classList.remove(OVERFLOW_HIDDEN_CLASS)
    } catch (error) {}
  }, [overflowHidden])
  //
  return assign(() => overflowHidden, {
    hidden: (isHidden: boolean) => setOverflowHidden(isHidden),
    //
    _testBodyHasClassHidden: () => {
      try {
        document.body.classList.contains(OVERFLOW_HIDDEN_CLASS)
      } catch (error) {}
      return false
    },
  })
}

export default useBodyOverflow
