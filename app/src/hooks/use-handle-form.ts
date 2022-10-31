/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react"
import { noop, prevent, pickBy, True } from "../util"

type KVPairs = { [key: string]: string }
type TValidationRules = {
  [key: string]: (fieldValue: string) => boolean
}
type TSubmitResult = {
  (v: KVPairs): Promise<boolean> | boolean | undefined
}
type TErrorResult = {
  (v: KVPairs): void
}
type TFormHandlers = {
  onSubmit?: TSubmitResult
  onError?: TErrorResult
}
const defaultHandlers = {
  onSubmit: True,
  onError: noop,
}

export const useHandleForm = (
  validation: TValidationRules,
  formHandlers: TFormHandlers
) => {
  const handleForm = {
    ...defaultHandlers,
    ...formHandlers,
  }

  const fields = Object.keys(validation)
  const initialValues = blankInitialValues_()
  //
  const [ok, setOk] = useState<boolean>()
  const [inputs, setInput] = useState(initialValues)
  const [valid, setValid] = useState(initialValues)
  //
  const setInput_ = (name: string, value: string) => {
    setInput((inputs = []) => ({ ...inputs, [name]: value }))
  }
  //
  // event{}
  const sync = ({ target }: React.FormEvent<HTMLInputElement>) =>
    setInput_(
      (target as HTMLInputElement).name,
      (target as HTMLInputElement).value
    )
  //
  useEffect(() => {
    setValid(fields.reduce(validateFields_, {}))
    setOk(fields.every(validate_))
  }, [inputs])
  //
  return {
    //
    // handle .onChange: Function
    sync,
    //
    // input values: object
    values: inputs,
    //
    // validated input values: object
    valid,
    //
    // all fields valid: boolean
    ok,
    //
    // set field/value manualy
    setInput: setInput_,
    //
    // handle form.onSubmit|onSubmit.error
    // @return: boolean to form.clear
    handle: prevent(async () => {
      setInputTrimmed_()
      ok
        ? (await handleForm.onSubmit(inputs)) && reset_()
        : handleForm.onError(pickBy(valid, (value) => !value))
    }),
    //
    reset: reset_,
  }
  //
  function setInputTrimmed_() {
    setInput(
      fields.reduce((v: any, field: string) => {
        v[field] = inputs[field].trim()
        return v
      }, {})
    )
  }
  function validateFields_(v: any, field: string) {
    v[field] = validate_(field)
    return v
  }
  function validate_(field: string) {
    return validation[field](inputs[field])
  }
  function blankInitialValues_() {
    return fields.reduce((v: any, name: string) => {
      v[name] = ""
      return v
    }, {})
  }
  function reset_() {
    setInput(initialValues)
  }
}
