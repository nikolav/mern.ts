import { useEffect } from "react"
import { useSendMail, useAuthApi } from "../../../hooks"
import { CallbackAny } from "../../../util/type"

interface IMailedCallback {
  onMail: CallbackAny
}
const TestUseSendMail = ({ onMail }: IMailedCallback) => {
  const { authenticate, user } = useAuthApi()
  const { error, loading, id, sendMail } = useSendMail()
  const isAuth = null != user?.accessToken
  // login -> mail -> assert
  useEffect(() => {
    setTimeout(() =>
      authenticate({
        email: "admin@nikolav.rs",
        password: "122333",
      })
    )
  }, [])
  useEffect(() => {
    if (isAuth) {
      sendMail({
        to: "admin@nikolav.rs",
        subject: "test",
        message: "test",
      })
    }
  }, [isAuth])
  useEffect(() => {
    if (id && !error && !loading) onMail(id)
  }, [id, error, loading])
  return <h1>TestUseSendMail</h1>
}

export default TestUseSendMail
