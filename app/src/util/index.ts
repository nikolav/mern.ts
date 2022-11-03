import assign from "lodash/assign"
import debounce from "lodash/debounce"
import forOwn from "lodash/forOwn"
import get from "lodash/get"
import identity from "lodash/identity"
import isArray from "lodash/isArray"
import isFunction from "lodash/isFunction"
import isString from "lodash/isString"
import keys from "lodash/keys"
import merge from "lodash/merge"
import noop from "lodash/noop"
import now from "lodash/now"
import omit from "lodash/omit"
import pick from "lodash/pick"
import pickBy from "lodash/pickBy"
import transform from "lodash/transform"

const True = () => true
const False = () => false
//
export {
  assign,
  debounce,
  False,
  forOwn,
  get,
  identity,
  isArray,
  isFunction,
  isString,
  keys,
  merge,
  noop,
  now,
  omit,
  pick,
  pickBy,
  transform,
  True,
}
export * from "./has-own"
export * from "./id-gen"
export * from "./prevent"
export * from "./sort-by-timestamp-desc"
export * from "./strip-end-slashes"
export * from "./unpack-blob"
