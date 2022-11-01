import { useState, useEffect } from "react"
import { useEmitter } from "../../../hooks"

export const EVENT__EMITTER_TEST = "test:cadvcsvqweq"

const TestEmitter_1 = () => {
  const [d$, setd] = useState("")
  const ee = useEmitter()
  useEffect(() => {
    ee.on(EVENT__EMITTER_TEST, () => setd(EVENT__EMITTER_TEST))
  }, [])
  return (
    <>
      <button
        data-testid="emitter1"
        onClick={() => ee.emit(EVENT__EMITTER_TEST)}
      >
        ok
      </button>
      <p data-testid="p1">{d$}</p>
    </>
  )
}
const TestEmitter_2 = () => {
  const [d$, setd] = useState("")
  const ee = useEmitter()
  useEffect(() => {
    ee.on(EVENT__EMITTER_TEST, () => setd(EVENT__EMITTER_TEST))
  }, [])
  return (
    <>
      <button
        data-testid="emitter2"
        onClick={() => ee.emit(EVENT__EMITTER_TEST)}
      >
        ok
      </button>
      <p data-testid="p2">{d$}</p>
    </>
  )
}

const TestEmitter = () => {
  return (
    <>
      <div>
        <TestEmitter_1 />
      </div>
      <div>
        <TestEmitter_2 />
      </div>
    </>
  )
}

export default TestEmitter
