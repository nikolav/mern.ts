import { useEffect } from "react"
import { useAuthApi } from "../../../hooks"
import { CallbackAny } from "../../../util/type"

interface ITestUseAuthApiProps {
  onUser: CallbackAny
}
const TestUseAuthApi = ({ onUser }: ITestUseAuthApiProps) => {
  const { user, authenticate } = useAuthApi()
  const isAuth = null != user?.accessToken
  useEffect(() => {
    setTimeout(() =>
      authenticate({
        email: "admin@nikolav.rs",
        password: "122333",
      })
    )
  }, [])
  useEffect(() => {
    if (isAuth) onUser(true)
  }, [isAuth])
  return <h1>TestUseAuthApi</h1>
}

export default TestUseAuthApi
