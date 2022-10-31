import { PropsWithChildren } from "react"
// https://react-query.tanstack.com/quick-start
import { QueryClient, QueryClientProvider, QueryCache } from "react-query"
const client = new QueryClient({
  queryCache: new QueryCache(),
})
export const QueryProvider = ({ children }: PropsWithChildren) => {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
