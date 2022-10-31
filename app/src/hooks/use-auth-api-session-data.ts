import { useEffect } from "react"
import { useResourceSession } from "./queries"

import { AuthData } from "./use-auth-api.d"
const useAuthApiSessionData = (user: AuthData | null) => {
  const {
    fetch: fetchSession,
    query: { data: session },
  } = useResourceSession(user)

  const ID = user?.id
  const AT = user?.accessToken
  const ST = user?.sessionToken

  useEffect(() => {
    if (ID && AT && ST) fetchSession([ID, AT, ST])
  }, [ID, AT, ST])

  return user ? session : null
}

export default useAuthApiSessionData
