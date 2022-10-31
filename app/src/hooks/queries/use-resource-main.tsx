/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  PropsWithChildren,
  useEffect,
  useState,
  createContext,
  useContext,
} from "react"

import { useQueryResource, QueryConfig } from "./use-query-resource"
import { REST_RESOURCE_main } from "../../app/store"
import { useAuthApi } from "../index"

const useQueryMain = (config: QueryConfig) =>
  useQueryResource(REST_RESOURCE_main, config)

export interface QuerResultResourceMain {
  resource: any
  query: any
}

const ResourceMainContext = createContext<QuerResultResourceMain>({
  query: "",
  resource: "",
})
export const useResourceMain = () => useContext(ResourceMainContext)
export const ResourceMainProvider = ({ children }: PropsWithChildren) => {
  const { user } = useAuthApi()
  const [resource, setResource] = useState(null)

  const enabled = null != user?.accessToken
  const query = useQueryMain({ enabled, accessToken: user?.accessToken })
  const { error, isLoading, data } = query

  useEffect(() => {
    if (!isLoading && error) return
    if (!isLoading && !error && data) setResource(data)
  }, [error, isLoading, data])

  useEffect(() => {
    setResource(enabled ? data : null)
  }, [enabled])

  const value: QuerResultResourceMain = { resource, query }

  return (
    <ResourceMainContext.Provider value={value}>
      {children}
    </ResourceMainContext.Provider>
  )
}
