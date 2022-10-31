const has_ = Function.prototype.call.bind(Object.prototype.hasOwnProperty)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const has = (node: any, field: string | number | symbol) =>
  has_(Object(node), field)
