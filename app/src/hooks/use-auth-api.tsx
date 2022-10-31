/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useEffect,
  useState,
  createContext,
  useContext,
  PropsWithChildren,
} from "react"
import axios from "axios"
import qs from "qs"

import { pick, stripEndSlashes, get, noop } from "../util"
import {
  AUTH_API_URL,
  AUTH_API_URL_register,
  AUTH_API_URL_users,
  // AUTH_API_URL_logout,
  AUTH_SESSION_TOKEN,
} from "../app/store"

import useAuthApiSessionData from "./use-auth-api-session-data"

import {
  AuthCredentials,
  AuthCredentialsWithName,
  // AuthData,
  AuthResponse,
  AuthSession,
} from "./use-auth-api.d"

const reIdTokens = /^(.*?)\.\.(.*?)\.\.(.*?)$/

const authDataFromResponse = ({ user, token }: AuthResponse) => ({
  ...user,
  ...pick(token, ["accessToken", "sessionToken", "refreshToken"]),
})

const blankContext = {
  error: null,
  processing: false,
  user: null,
  session: null,
  authenticate: () => Promise.resolve(),
  register: () => Promise.resolve(),
  logout: noop,
}
const AuthApiContext = createContext<AuthSession>(blankContext)
export const useAuthApi = () => useContext(AuthApiContext)

// -- api.endpoints x2; @auth, @users
export const AuthApiProvider = ({ children }: PropsWithChildren) => {
  const [authSession, setAuthSession] = useState({
    error: null,
    processing: false,
    user: null,
    session: null,
  })

  const authSessionApi = {
    authenticate: authenticate_,
    logout: logout_,
    register: register_,
  }

  const authSessionValue = {
    ...authSession,
    ...authSessionApi,
  }
  // manage auth state
  const authStatusError = (error: any) =>
    setAuthSession((s) => ({ ...s, error }))
  const authStatusProcessingOff = () =>
    setAuthSession((s) => ({ ...s, processing: false }))
  const setAuth = (user: any) => setAuthSession((s) => ({ ...s, user }))
  const setSessionData = (session: any) =>
    setAuthSession((sess) => ({ ...sess, session }))

  // auth helper, load session data when @logged-in
  const session = useAuthApiSessionData(authSession.user)
  useEffect(() => {
    setSessionData(session)
  }, [session])

  // cache session creds, enable auto login @mount
  const ID = get(authSession, "user.id")
  const AT = get(authSession, "user.accessToken")
  const ST = get(authSession, "user.sessionToken")
  useEffect(() => {
    try {
      if (ID && AT && ST)
        localStorage.setItem(AUTH_SESSION_TOKEN, `${ID}..${AT}..${ST}`)
    } catch {
      //
    }
  }, [ID, AT, ST])

  // auto login @mount from localStorage
  useEffect(() => {
    loadSession_()
  }, [])

  return (
    <AuthApiContext.Provider value={authSessionValue}>
      {children}
    </AuthApiContext.Provider>
  )

  // -- api.accessToken email + password
  async function authenticate_(creds: AuthCredentials) {
    let authData = null
    authStatusBegin()

    try {
      const { data } = await axios({
        method: "post",
        url: AUTH_API_URL,
        data: qs.stringify(creds),
      })
      authData = authDataFromResponse(data)
      setAuth(authData)
    } catch (error) {
      authStatusError(error)
    } finally {
      authStatusProcessingOff()
    }

    return authData
  }

  // -- user.create name+email+password
  async function register_(creds: AuthCredentialsWithName) {
    // let authData
    authStatusBegin()

    try {
      const { data } = await axios({
        method: "post",
        url: AUTH_API_URL_register,
        data: qs.stringify(creds),
      })

      authDataFromResponse(data)
      // if (!isValidAuthData(authData))
      //   throw { "bad request: @register_": authData }

      await authenticate_(pick(creds, ["email", "password"]))
    } catch (error) {
      authStatusError(error)
    } finally {
      authStatusProcessingOff()
    }
  }

  // creds @localStorage id+token
  async function loadSession_() {
    let authData
    authStatusBegin()

    try {
      const stored = localStorage.getItem(AUTH_SESSION_TOKEN)
      if (!stored) throw `no user`
      const { id, token, sessionToken } = ((m: string[]) => ({
        id: m[1],
        token: m[2],
        sessionToken: m[3],
      }))(reIdTokens.exec(stored) as string[])

      if (id && token) {
        const { data } = await axios({
          method: "get",
          url: `${stripEndSlashes(AUTH_API_URL_users)}/${encodeURI(id)}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        authData = authDataFromResponse({
          token: { accessToken: token, sessionToken, refreshToken: "" },
          user: { id, ...data },
        })

        setAuth(authData)
      }
    } catch {
      //
    } finally {
      authStatusProcessingOff()
    }
  }
  // clear session
  async function logout_() {
    let logoutError
    try {
      // clear local auth
      setAuthSession((sess) => ({
        ...sess,
        user: null,
        error: null,
        processing: false,
      }))

      // clear local cache, disable auth reload
      localStorage.removeItem(AUTH_SESSION_TOKEN)

      // // no hard logout here
      // //   preserve server session in db
      // //   dont expire tokens automatically
      // //   .. clear session mannualy
      // await axios({
      //   method: "delete",
      //   url: `${stripEndSlashes(AUTH_API_URL_logout)}/${authSession.user?._id}`,
      //   data: qs.stringify({ sessionToken: authSession.user?.sessionToken }),
      //   headers: {
      //     Authorization: `Bearer ${authSession.user?.accessToken}`,
      //   },
      // });
    } catch (error) {
      logoutError = error
    }

    if (logoutError) console.error(logoutError)
  }

  // reset auth-status before hiting api
  function authStatusBegin() {
    setAuthSession((sess) => ({
      ...sess,
      error: null,
      processing: true,
    }))
  }
}
