export type OrNull<T> = T | null
export type OneOrMany<T> = T | T[]
export type OneOrManyOrNull<T> = OrNull<OneOrMany<T>>
export type CallbackAny = (...args: any[]) => any
