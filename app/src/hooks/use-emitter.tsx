import { createContext, useContext, PropsWithChildren } from "react"
// https://www.npmjs.com/package/event-emitter
import EE, { Emitter } from "event-emitter"

const emitter = EE()
export const EmitterContext = createContext<Emitter>(emitter)
export const useEmitter = () => useContext(EmitterContext)
export const EventEmitterProvider = ({ children }: PropsWithChildren) => (
  <EmitterContext.Provider value={emitter}>{children}</EmitterContext.Provider>
)
