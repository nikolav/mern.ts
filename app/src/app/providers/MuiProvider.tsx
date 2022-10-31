import {
  useEffect,
  useState,
  useMemo,
  useContext,
  createContext,
  PropsWithChildren,
} from "react"
// https://mui.com/material-ui/customization/theming/#theme-builder
// https://mui.com/material-ui/customization/theming/#createtheme-options-args-theme
// https://mui.com/material-ui/customization/default-theme/#main-content
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
  ThemeOptions,
  // alpha,
  // styled,
} from "@mui/material/styles"
import useMediaQuery from "@mui/material/useMediaQuery"
import { deepmerge } from "@mui/utils"
import CssBaseline from "@mui/material/CssBaseline"
import { PaletteMode } from "@mui/material"

import { useColorModeTW, MODE_DARK as MODE_DARK_TW } from "../store"

const COLORMODE_DARK: PaletteMode = "dark"
const COLORMODE_LIGHT: PaletteMode = "light"
const DEFAULT_RWD_FONT_SIZE_FACTOR = 1.22

const baseTheme = {
  breakpoints: {
    keys: ["xs", "sm", "md", "lg", "xl", "2xl"],
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      "2xl": 1536,
    },
  },
  typography: {
    fontFamily: [
      "Open Sans",
      "Roboto",
      "-apple-system",
      "BlinkMacSystemFont",
      "Segoe UI",
      "Candara",
      "Helvetica Neue",
      "DejaVu Sans",
      "Bitstream Vera Sans",
      "Trebuchet MS",
      "Verdana",
      "Verdana Ref",
      "Arial",
      "sans-serif",
      "Apple Color Emoji",
      "Segoe UI Emoji",
      "Segoe UI Symbol",
    ].join(","),
  },
}

const themePrimary = {
  palette: {
    mode: COLORMODE_LIGHT,
    primary: {
      main: "#4682B3",
    },
    secondary: {
      main: "#385269",
    },
    error: {
      main: "#ef9a9a",
    },
    success: {
      main: "#66bb6a",
    },
  },
}

const themeDark = {
  palette: {
    mode: COLORMODE_DARK,
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#385269",
    },
    error: {
      main: "#ef9a9a",
    },
    success: {
      main: "#66bb6a",
    },
    background: {
      default: "#101010",
      paper: "#1a1a1a",
    },
  },
}
const getDesignTokens = (mode: PaletteMode) =>
  COLORMODE_DARK === mode ? themeDark : themePrimary

export type TTheme = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  theme: ThemeOptions
  mode: PaletteMode
  prefersDarkMode: boolean
  isDark: () => boolean
  isLight: () => boolean
  setColorModeDark: () => void
  setColorModeLight: () => void
  toggleColorMode: () => void
}
// @@
export const ColorModeContext = createContext<TTheme | null>(null)
export const useColorMode = () => useContext(ColorModeContext)
export const MuiProvider = ({ children }: PropsWithChildren) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")
  const [mode, setMode] = useState<PaletteMode>(
    prefersDarkMode ? COLORMODE_DARK : COLORMODE_LIGHT
  )
  const theme = useMemo(
    () =>
      responsiveFontSizes(
        createTheme(deepmerge(getDesignTokens(mode), baseTheme)),
        {
          factor: DEFAULT_RWD_FONT_SIZE_FACTOR,
        }
      ),
    [mode]
  )
  useEffect(() => {
    setMode(prefersDarkMode ? COLORMODE_DARK : COLORMODE_LIGHT)
  }, [prefersDarkMode])

  const setModeDark_ = () => setMode(COLORMODE_DARK)
  // colorMode
  const colorMode: TTheme = {
    mode,
    theme,
    prefersDarkMode,
    isDark: () => COLORMODE_DARK === mode,
    isLight: () => COLORMODE_LIGHT === mode,
    setColorModeDark: setModeDark_,
    setColorModeLight: () => setMode(COLORMODE_LIGHT),
    toggleColorMode: () =>
      setMode((m) => (COLORMODE_DARK === m ? COLORMODE_LIGHT : COLORMODE_DARK)),
  }
  // sync tailwind theme @change.mui
  const colorModeTW = useColorModeTW()
  useEffect(() => {
    if (COLORMODE_DARK === mode) {
      colorModeTW.setColorModeDark()
      return
    }
    colorModeTW.setColorModeLight()
  }, [mode])
  // sync mui theme @changes.tw
  const modeTW = colorModeTW()
  useEffect(() => {
    if (MODE_DARK_TW === modeTW) setModeDark_()
  }, [modeTW])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ColorModeContext.Provider value={colorMode}>
        {children}
      </ColorModeContext.Provider>
    </ThemeProvider>
  )
}
