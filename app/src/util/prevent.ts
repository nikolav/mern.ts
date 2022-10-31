/* eslint-disable @typescript-eslint/no-explicit-any */
type TAnyEvent = any
export const prevent = (callback: any) => {
  const handler = (e: TAnyEvent) => {
    e.preventDefault()
    callback(e)
  }
  return handler
}
