import axios from "axios"
import qs from "qs"
import { QueryFunction } from "react-query"
import { useQueryResourceCustom, QueryConfig } from "./use-query-resource"
import { stripEndSlashes } from "../../util"
import { AUTH_API_URL_session } from "../../app/store"

type OrNull<T> = T | null
interface AuthUser {
  id: string | number | symbol
  accessToken: string
  sessionToken: string
}
// @@ QueryFunction
const queryFnSessionData: QueryFunction = async ({ queryKey }) => {
  // eslint-disable-next-line no-unused-vars
  const [_prefix, userId, accessToken, sessionToken] = queryKey
  let sessionData = null
  try {
    if (userId && accessToken && sessionToken) {
      const { data } = await axios({
        method: "post",
        url: `${stripEndSlashes(AUTH_API_URL_session)}/${userId}`,
        data: qs.stringify({ sessionToken }),
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      //
      sessionData = data
    }
  } catch (error) {
    console.error({ error })
  }

  return sessionData
}

export const useResourceSession = (
  user: OrNull<AuthUser> = null,
  config: QueryConfig = {}
) => {
  const enabled = !!(user?.id && user?.accessToken && user?.sessionToken)
  return useQueryResourceCustom(queryFnSessionData, "session", {
    enabled,
    ...config,
  })
}
