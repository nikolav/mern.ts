import { useEffect, useState } from "react"
import { onValue, set, ref } from "firebase/database"
import { firebase } from "../app/services"
import { now } from "../util"

const { dbRealtime: db } = firebase
export const localId = (id: string) => `ljgwutzgzwr.${id}`
// @@
const useSocialLike = (id: string) => {
  const [likeCount, setLikeCount] = useState<number>(0)
  const refLike = ref(db, `like/${id}`)
  const LIKECACHE = localId(id)
  const isLiked = () => null != localStorage.getItem(LIKECACHE)

  // @mount sync likes
  useEffect(
    () =>
      onValue(refLike, (res) =>
        setLikeCount((current) => res.val() || current)
      ),
    []
  )

  return { like, likeCount, isLiked }

  function like() {
    if (isLiked()) return unlike_()

    localStorage.setItem(LIKECACHE, String(now()))
    set(refLike, likeCount + 1)
  }
  function unlike_() {
    localStorage.removeItem(LIKECACHE)
    set(refLike, likeCount - 1)
  }
}

export default useSocialLike
