/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import { useQuery, useQueryClient, QueryFunction } from "react-query"
import axios from "axios"
import { stripEndSlashes } from "../../util"
import { API_URL } from "../../app/store"

export type QueryConfig = {
  [key: string]: any
}

export const DEFAULT_QUERY_CONFIG = {
  // refresh data on every window focus
  refetchOnWindowFocus: true,
  //   refetchOnMount: bool,
  //   refetchOnReconnect: bool,

  // how oftern to refetch data
  staleTime: 56789, // [0], `Infinity`: fresh forever, refetch manually

  // ttl for cached/hiden query for memcached data thats not displaying
  cacheTime: 12 * 60 * 1000, // in ms; `Infinity` doesnt gc queries

  // how many times to retry failed query
  retry: 1, // number | boolean | 0 [3]
  // retryDelay: number [sec] | func

  //  enable dependent queries;
  //    allow query to run after prev. data has been fetched
  //  run q query if other data is available
  //  dependent queries start in .isIdle state
  enabled: true,

  // use existing query data seed
  // initialData: any,
  // ..start with exisiting cache if any;
  // @deprecated
  // initialData: () => qCache.findAll(ARTICLES),
  // show initial data but fetch on component mount
  initialStale: true,

  //   • access RQ cache
  //   queryCache {
  //   .getQueryData(query: string): data[]
  //   .setQueryData(key: [string, data-ID], data: object)
  //   .invalidateQueries(key: string|array, [opts])
  //     // with .refetchActive=true opt: mark queries as stale for next refetch
  //   preload data imperatively wihout any user actions taken,
  //   populate cache with some predicted/popular data to show,
  //     or .onHover to populate page data
  //   .prefetchQuery([key,id], fetcher: ()=>void, [opts]); can take options same as .useQuery
  // }

  // poll interval [ms]
  refetchInterval: 67890,
  //
  //  onSuccess: (data) => null,
  //  onError: (error) => null,
  //  onSettled: (data, error) => null,

  // prepopulate its cache if empty
  // with placeholder, partial or incomplete data
  // it doesnt cache this data like .initialData
  // .. can pass memozed function to calc. data upfront
  // .placeholderData

  // // pick certain fields from response data to cache
  // select: (node) => pickFields(node),
}

export const useQueryResource = (RESOURCE: string, config: QueryConfig) => {
  const queryClient = useQueryClient()
  const url = `${stripEndSlashes(API_URL)}/${RESOURCE}`
  return useQuery(
    RESOURCE,
    () =>
      axios({
        method: "get",
        url,
        headers: {
          Authorization: `Bearer ${config.accessToken}`,
        },
      }).then(({ data }) => data),
    {
      ...DEFAULT_QUERY_CONFIG,
      initialData: () => queryClient.getQueryData(RESOURCE),
      ...config,
    }
  )
}

export const useQueryResourceCustom = (
  qFunction: QueryFunction,
  qPrefix: string | null = null,
  qConfig: QueryConfig
) => {
  // set state to fetch qFunction with different params
  const [keys$, setk] = useState<string[]>([])
  const queryClient = useQueryClient()

  const keys = null != qPrefix ? [qPrefix, ...keys$] : keys$
  const query = useQuery(keys, qFunction, {
    ...DEFAULT_QUERY_CONFIG,
    initialData: () => queryClient.getQueryData(keys),
    ...qConfig,
  })

  return {
    // params as array
    fetch: setk,
    query,
  }
}
