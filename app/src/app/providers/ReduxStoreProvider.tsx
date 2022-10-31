import { PropsWithChildren } from "react"
import { Provider } from "react-redux"
import { store } from "../store/redux"

export const ReduxStoreProvider = ({ children }: PropsWithChildren) => {
  return <Provider store={store}>{children}</Provider>
}
