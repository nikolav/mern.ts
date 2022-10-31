import {
  useEffect,
  useState,
  createContext,
  useContext,
  PropsWithChildren,
} from "react"
import jQuery from "jquery"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ContextBrowser = createContext<any>(null)
export const useBrowser = () => useContext(ContextBrowser)

export const BrowserContextProvider = ({ children }: PropsWithChildren) => {
  const [w$, setw] = useState(null)
  const [d$, setd] = useState(null)
  const [m$, setm] = useState(false)
  const [r$, setr] = useState(false)

  useEffect(() => {
    const w = new Function("return this")()
    const d = w.document

    setw(w)
    setd(d)
    setm(true)

    return () => setm(false)
  }, [])
  useEffect(() => {
    if (w$ && d$) {
      jQuery(() => setr(true))
    }
  }, [w$, d$])

  const api = {
    isMounted: m$,
    isReady: r$,
    window: w$,
    document: d$,
  }
  return (
    <ContextBrowser.Provider value={api}>{children}</ContextBrowser.Provider>
  )
}
