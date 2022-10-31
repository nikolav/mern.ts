/* eslint-disable @typescript-eslint/no-explicit-any */
export interface UserResponse {
  id: string
  email: string
  role: string
  createdAt: string
}
export interface TokenResponse {
  tokenType?: string
  expiresIn?: string
  accessToken: string
  sessionToken: string
  refreshToken: string
}
export interface AuthResponse {
  user: UserResponse
  token: TokenResponse
}
export type AuthData = UserResponse &
  Omit<TokenResponse, "tokenType" | "expiresIn">
export interface AuthCredentials {
  email: string
  password: string
}
export type AuthCredentialsWithName = AuthCredentials & { name: string }
type Authenticate = {
  // eslint-disable-next-line no-unused-vars
  (...args: any[]): Promise<any>
}
type Register = {
  // eslint-disable-next-line no-unused-vars
  (...args: any[]): Promise<any>
}
type Logout = {
  // eslint-disable-next-line no-unused-vars
  (...args: any[]): void
}
export interface AuthSession {
  error: any
  processing: boolean
  user: AuthData | null
  authenticate: Authenticate
  register: Register
  logout: Logout
  session: { [key: string]: any } | null
}
