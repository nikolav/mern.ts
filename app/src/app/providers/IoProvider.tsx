import { useEffect, createContext, useContext, PropsWithChildren } from "react"
import io, { Socket } from "socket.io-client"
import { IO_SERVER } from "../store"
import { useStateReducer, useBrowser, TStateReducerClient } from "../../hooks"
import { OrNull } from "../../util/type"

const IOContext = createContext<OrNull<Socket>>(null)
export const useIO = () => useContext(IOContext)

export const IOProvider = ({ children }: PropsWithChildren) => {
  const client = useStateReducer<{ socket: OrNull<Socket> }>({ socket: null })
  const { isReady } = useBrowser()
  useEffect(() => {
    if (isReady) {
      try {
        const socket: Socket = io(IO_SERVER, { withCredentials: true })
        if (!socket) throw `no io connection`
        client.put(() => ({ socket }))
      } catch (error) {
        console.error({ error })
      }
    }
  }, [isReady])
  //
  const { socket } = client()
  return <IOContext.Provider value={socket}>{children}</IOContext.Provider>
}
