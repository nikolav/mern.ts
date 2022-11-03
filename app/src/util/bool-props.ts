import transform from "lodash/transform"

interface IFlags {
  [key: string]: boolean
}
export const boolProps = <T extends Readonly<{}>>(node: T): IFlags =>
  transform<T, IFlags>(
    node,
    (res, value, key) => {
      res[key] = Boolean(value)
    },
    {}
  )
