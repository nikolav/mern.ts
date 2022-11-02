import { useState, useEffect } from "react"
import axios from "axios"
import qs from "qs"

import { useAuthApi } from "./use-auth-api"
import { SEND_MAIL_URL } from "../app/store"
import { merge, stripEndSlashes, omit } from "../util"
import { OrNull } from "../util/type"

const MAIL_DEFAULTS = {
  template: "text-message",
}

type IMailTemplate = OrNull<"text-message">
interface IMailDescription {
  template?: IMailTemplate
  to: string
  subject: string
  message: string
  text?: string
}
interface IMailDescriptionKey extends IMailDescription {
  _key?: number
}
type TMessageId = OrNull<string>

export const useSendMail = () => {
  const [error$, setError] = useState<any>()
  const [loading$, setLoading] = useState(false)
  const [mail$, setMail] = useState<IMailDescriptionKey>()
  const [id$, setId] = useState<TMessageId>(null)

  const { user } = useAuthApi()
  const AT = user?.accessToken
  const isAuth = null != AT

  const mailStartReset = () => {
    setId(null)
    setError(null)
    setLoading(true)
  }

  const setNewMessage_ = (mail: IMailDescription) => {
    const mailOptions: IMailDescriptionKey = merge({}, MAIL_DEFAULTS, mail, {
      _key: Date.now(),
    })
    setMail(mailOptions)
  }

  useEffect(() => {
    if (!isAuth || !mail$) return
    sendMail_(mail$)
  }, [mail$])

  return {
    error: error$,
    loading: loading$,
    id: id$,
    sendMail: setNewMessage_,
  }

  async function sendMail_(mail$: IMailDescriptionKey) {
    let id: TMessageId = null
    try {
      mailStartReset()
      const { data: messageId } = await axios({
        method: "post",
        url: `${stripEndSlashes(SEND_MAIL_URL)}/${mail$.template}`,
        data: qs.stringify(omit(mail$, ["template"])),
        headers: {
          Authorization: `Bearer ${AT}`,
        },
      })
      id = messageId
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }

    setId(id)
  }
}
