/* eslint-disable @typescript-eslint/no-explicit-any */
import { assign, identity, has, transform } from "../util"
import { useReducer, useState } from "react"

export const STATE_PUT = "state:put"
export const STATE_CLEAR = "state:clear"
type Callback = {
  // eslint-disable-next-line no-unused-vars
  (...args: any[]): any
}
export type TStateReducerClient = {
  put: Callback
  clear: Callback
  $pre: Callback
  $computed: Callback
  $rules: Callback
}
export const useStateReducer = (initialValue = {}) => {
  const [m$, setm] = useState({ pre: identity, format: identity })
  const [r$, setr] = useState({})

  const [state, dispatch] = useReducer(
    (state: any, { type, payload }: any): any => {
      switch (true) {
        case STATE_PUT === type:
          const newState = transform(
            payload,
            // eslint-disable-next-line no-unused-vars
            (accumState, value, key) => {
              accumState[key] = has(r$, key) ? Object(r$)[key](value) : value
            },
            { ...state }
          )
          return m$.pre(newState)
        case STATE_CLEAR === type:
          return m$.pre({ ...state, [payload.name]: payload.empty })
        default:
          break
      }

      return { ...state }
    },
    initialValue
  )
  const client = () => m$.format(state)
  assign(client, {
    put: (callback: Callback) => {
      dispatch({ type: STATE_PUT, payload: callback(state) })
    },
    clear: (name: string | number | symbol, empty = null) => {
      dispatch({ type: STATE_CLEAR, payload: { name, empty } })
    },
    // @access | before write
    $pre: (callback: Callback) => {
      setm((mw) => ({ ...mw, pre: callback }))
    },
    // @access | before read
    $computed: (callback: Callback) => {
      setm((mw) => ({ ...mw, format: callback }))
    },
    // @access | write validated
    $rules: (rules: any) => {
      setr((r) => ({ ...r, ...rules }))
    },
  })

  return client
}
