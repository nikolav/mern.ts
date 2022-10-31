import { useEffect } from "react"
import { createSlice } from "@reduxjs/toolkit"
import { useSelector, useDispatch } from "react-redux"
import useMediaQuery from "@mui/material/useMediaQuery"

import { has, assign } from "../../../util"
//
const MODE = "gzozndmyiwh"
//
export const MODE_LIGHT = "kigdgurdxqd"
export const MODE_DARK = "ljdwydmjudc"
export const COLOR_MODE = {
  [MODE_LIGHT]: 1,
  [MODE_DARK]: 0,
}
//
const initialState = {
  [MODE]: MODE_LIGHT,
}

export const colorModeSlice = createSlice({
  name: "colorMode",
  initialState,
  reducers: {
    setColorMode: (state, action) => {
      const mode = action.payload
      if (has(COLOR_MODE, mode)) state[MODE] = mode
    },
    setColorModeLight: (state) => {
      state[MODE] = MODE_LIGHT
    },
    setColorModeDark: (state) => {
      state[MODE] = MODE_DARK
    },
    toggleColorMode: (state) => {
      state[MODE] = MODE_DARK === state[MODE] ? MODE_LIGHT : MODE_DARK
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  setColorMode,
  setColorModeLight,
  setColorModeDark,
  toggleColorMode,
} = colorModeSlice.actions

export default colorModeSlice.reducer

// export redux store shortcut
export const useColorModeTW = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")
  //
  const colorMode = useSelector((state) => Object(state).colorMode)
  const dispatch = useDispatch()
  //
  const mode = colorMode[MODE]
  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        // w$.matchMedia("(prefers-color-scheme: dark)").matches)
        prefersDarkMode)
    ) {
      dispatch(setColorModeDark())
      return
    }
    //
    dispatch(setColorModeLight())
  }, [prefersDarkMode])
  //
  useEffect(() => {
    if (mode === MODE_DARK) {
      _addClassDark()
      localStorage.theme = "dark"
      return
    }
    //
    _rmClassDark()
    localStorage.theme = "light"
  }, [mode])
  //
  const handle = assign(() => colorMode[MODE], {
    isDark: () => colorMode[MODE] === MODE_DARK,
    isLight: () => colorMode[MODE] === MODE_LIGHT,
    setColorMode: (mode: string) => dispatch(setColorMode(mode)),
    setColorModeDark: () => dispatch(setColorModeDark()),
    setColorModeLight: () => dispatch(setColorModeLight()),
    toggleColorMode: () => dispatch(toggleColorMode()),
  })
  //
  return handle
}

function _addClassDark() {
  document.documentElement.classList.add("dark")
}
function _rmClassDark() {
  document.documentElement.classList.remove("dark")
}
