import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { useSelector, useDispatch } from "react-redux"
import { assign, has } from "../../../util"
import { RootState } from "../redux"

export interface AppDataState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export const TEST = "lqxhsnqobpw"

const initialState: AppDataState = {
  [TEST]: TEST,
}

export const appdataSlice = createSlice({
  name: "appdata",
  initialState,
  reducers: {
    setAppData: (
      state,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      action: PayloadAction<{ name: string; value: any }>
    ) => {
      state[action.payload.name] = action.payload.value
    },
    removeAppData: (state, action: PayloadAction<string>) => {
      delete state[action.payload]
    },
    clearAppDataEntry: (
      state,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      action: PayloadAction<{ name: string; EMPTY: any }>
    ) => {
      state[action.payload.name] = action.payload.EMPTY
    },
  },
})

// Action creators are generated for each case reducer function
export const { setAppData, removeAppData, clearAppDataEntry } =
  appdataSlice.actions

export default appdataSlice.reducer

// redux shortcut hook
export const useAppData = () => {
  const appdata = useSelector((state: RootState) => state.appdata)
  const dispatch = useDispatch()

  const client = assign((name: string) => appdata[name], {
    clear: (name: string, EMPTY = null) =>
      dispatch(clearAppDataEntry({ name, EMPTY })),

    has: (name: string) => has(appdata, name),

    ls: () => Object.keys(appdata),

    rm: (name: string) => dispatch(removeAppData(name)),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    set: (name: string, value: any) => dispatch(setAppData({ name, value })),
  })

  return client
}
