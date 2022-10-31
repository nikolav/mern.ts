import { PropsWithChildren } from "react"

type TProps = PropsWithChildren & { text: string }

const TestComponent = ({ text }: TProps) => {
  return <p>{text}</p>
}

export default TestComponent
