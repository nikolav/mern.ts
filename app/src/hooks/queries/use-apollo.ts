import { useQuery, DocumentNode } from "@apollo/client"
import { merge } from "../../util"
import { useAuthApi } from "../index"

// https://www.apollographql.com/docs/react/data/queries#options
export const DEFAULT_APOLLO_CLIENT_QUERY_CONFIG = {
  // in [ms]
  // 0: no polling
  pollInterval: 45678,
  // noditf network status @networkStatus: NetworkStatus
  // If true, the in-progress query's associated component re-renders whenever the
  //   network status changes or a network error occurs.
  notifyOnNetworkStatusChange: false,
  //   none -- treat all GraphQL errors as runtime errors
  //     ..discards any query response data returned by the server and sets the error property
  //   all -- does not discard query response data
  errorPolicy: "none",
  // consfigure cache
  //   cache-first -- check cache first for data
  //   network-only -- network only, no cache
  // https://www.apollographql.com/docs/react/data/queries#supported-fetch-policies
  fetchPolicy: "cache-first",
  // configure subsequent executions
  // ..what it does after initial fetch
  nextFetchPolicy: "cache-first",
  //
  // query
  // variables
  // onCompleted
  // onError

  // If true, the query is not executed
  skip: false,

  // Pass false to skip executing the query during server-side rendering.
  // ssr: boolean

  // If true, the query can return partial results from the cache if
  //   the cache doesn't contain results for all queried fields.
  //   The default value is false.
  // returnPartialData: boolean
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useApollo = (q: DocumentNode, config: any = {}, ...rest: []) => {
  const { user } = useAuthApi()
  const skip = !user?.accessToken
  //
  return useQuery(
    q,
    merge({}, DEFAULT_APOLLO_CLIENT_QUERY_CONFIG, { skip }, config),
    ...rest
  )
}
