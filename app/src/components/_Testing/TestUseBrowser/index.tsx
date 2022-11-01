import { useEffect } from "react"
import { useBrowser } from "../../../hooks"

interface ITestUseBrowserProps {
  onDom: (res: boolean) => void
}
const TestUseBrowser = ({ onDom }: ITestUseBrowserProps) => {
  const { isMounted, isReady, window, document } = useBrowser()
  useEffect(() => {
    if (isMounted && isReady && window && document) onDom(true)
  }, [isMounted, isReady, window, document])
  return <h1>TestUseBrowser</h1>
}

export default TestUseBrowser
