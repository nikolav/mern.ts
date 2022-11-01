import { useBodyOverflow } from "../../../hooks"

const TestUseBodyOverflow = () => {
  const overflow = useBodyOverflow()
  const hasClassHidden = overflow._testBodyHasClassHidden()

  return (
    <>
      <h1 data-testid="test">{hasClassHidden ? "hidden" : "!hidden"}</h1>
      <button
        data-testid="overflow:not-hidden"
        onClick={() => overflow.hidden(false)}
      >
        ok
      </button>
      <button
        data-testid="overflow:hidden"
        onClick={() => overflow.hidden(true)}
      >
        ok
      </button>
    </>
  )
}

export default TestUseBodyOverflow
