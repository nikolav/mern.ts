import assign from "lodash/assign"
import debounce from "lodash/debounce"
import get from "lodash/get"
import identity from "lodash/identity"
import isFunction from "lodash/isFunction"
import isString from "lodash/isString"
import merge from "lodash/merge"
import noop from "lodash/noop"
import pick from "lodash/pick"
import pickBy from "lodash/pickBy"
import transform from "lodash/transform"
import forOwn from "lodash/forOwn"
import isArray from "lodash/isArray"

const True = () => true
const False = () => false
//
export {
  forOwn,
  isArray,
  assign,
  debounce,
  False,
  get,
  identity,
  isFunction,
  isString,
  merge,
  noop,
  pick,
  pickBy,
  transform,
  True,
}
export * from "./has-own"
export * from "./strip-end-slashes"
export * from "./prevent"
