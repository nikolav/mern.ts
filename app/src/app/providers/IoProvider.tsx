import { useEffect, createContext, useContext, PropsWithChildren } from "react"
import io, { Socket } from "socket.io-client"
import { IO_SERVER } from "../store"
import { useStateReducer, useBrowser, TStateReducerClient } from "../../hooks"

const IOContext = createContext<Socket | null>(null)
export const useIO = () => useContext(IOContext)

export const IOProvider = ({ children }: PropsWithChildren) => {
  const client = useStateReducer({ socket: null })
  const { isReady } = useBrowser()
  useEffect(() => {
    if (isReady) {
      try {
        const socket: Socket = io(IO_SERVER, { withCredentials: true })
        if (!socket) throw `no io connection`
        ;(client as unknown as TStateReducerClient).put(() => ({ socket }))
      } catch (error) {
        console.error({ error })
      }
    }
  }, [isReady])
  //
  const { socket } = client()
  return <IOContext.Provider value={socket}>{children}</IOContext.Provider>
}
