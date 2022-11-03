import { useEffect, useState } from "react"
import { onValue, set, ref, push, remove } from "firebase/database"
import { firebase } from "../app/services"
import { sortByTimestampDesc, assign, now, keys } from "../util"

const CREATED_AT = "_@"
const { dbRealtime: db } = firebase
export type TComment = {
  uid?: string
  user?: string
  comment: string
}
export type TCommentsRow = TComment & { key: string; [CREATED_AT]: number }
export type TCommentsState = { [key: string]: TCommentsRow }
//@@
const useSocialComments = (entityId: string) => {
  const entitiyDbPath = `comments/${entityId}`
  const refComments = ref(db, entitiyDbPath)
  const [commentsDB, setCommentsDB] = useState<TCommentsState>({})
  const handle = assign(() => commentsDB, {
    add: (comment: TComment) => {
      const refNewComment = push(refComments)
      set(refNewComment, {
        ...comment,
        key: refNewComment.key,
        [CREATED_AT]: now(),
      })
    },

    rm: (key: string) =>
      remove(ref(db, `${entitiyDbPath}/${key}`)).then(
        (_res) => 1 === keys(commentsDB).length && setCommentsDB({})
      ),

    ls: () =>
      keys(commentsDB)
        .map((key: string) => commentsDB[key])
        .sort(sortByTimestampDesc(CREATED_AT)),

    len: () => keys(commentsDB).length,
  })

  useEffect(
    () =>
      onValue(refComments, (res) =>
        setCommentsDB((current: TCommentsState) => res.val() || current)
      ),
    []
  )

  return handle
}

export default useSocialComments
