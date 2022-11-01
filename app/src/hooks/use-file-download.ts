import { useEffect, useState } from "react"
import axios from "axios"
import { saveAs } from "file-saver"

import { useAuthApi } from "./use-auth-api"
import { FILE_DOWNLOAD_URL } from "../app/store"
import { stripEndSlashes, unpackBlob, omit } from "../util"

type TFileID = string
type TFilename = string | undefined
interface IFileLookup {
  fileID: TFileID
  filename?: TFilename
}
interface IFileLookupWithKey extends IFileLookup {
  _key?: number
}

export const useFileDownload = () => {
  const { user } = useAuthApi()
  const [f$, setf] = useState<IFileLookupWithKey>()
  const [error$, setError] = useState<any>()
  const [loading$, setLoading] = useState(false)
  const AT = user?.accessToken
  const isAuth = null != AT

  const statusDownloadStart = () => {
    setError(null)
    setLoading(true)
  }

  useEffect(() => {
    if (!isAuth || !f$?.fileID) return
    download_(omit(f$, ["_key"]))
  }, [isAuth, f$])

  return {
    error: error$,
    loading: loading$,
    download: (fileID: TFileID, filename?: TFilename) =>
      setf({ fileID, filename, _key: Date.now() }),
  }

  async function download_({ fileID, filename }: IFileLookup) {
    let file = null
    try {
      statusDownloadStart()
      const { data: blob } = await axios({
        method: "get",
        url: `${stripEndSlashes(FILE_DOWNLOAD_URL)}/${encodeURI(fileID)}`,
        headers: {
          Authorization: `Bearer ${AT}`,
        },
        responseType: "arraybuffer",
      })

      if (!blob) throw `bad request`

      const [filenameDd, file$] = await unpackBlob(blob)
      file = await saveAs(file$, filename || filenameDd)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }

    return file
  }
}
