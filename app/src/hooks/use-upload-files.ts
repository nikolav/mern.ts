/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react"
import axios from "axios"

import { FILE_UPLOAD_URL } from "../app/store"
import { useAuthApi } from "./use-auth-api"
import { forOwn, isArray } from "../util"
import { OrNull } from "../util/type"

interface TFormDataEntries {
  [key: string]: string | [File, string]
}
interface TUploadedFiles {
  [key: string]: string | number
}
export const useUploadFiles = () => {
  const { user } = useAuthApi()
  const [data$, setData] = useState<TFormDataEntries>()
  const [files$, setFiles] = useState<OrNull<TUploadedFiles>>()
  const [loading$, setLoading] = useState<boolean>(false)
  const [error$, setError] = useState<any>()

  const isAuth = null != user?.accessToken
  const statusUploadStart = () => {
    setFiles(null)
    setError(null)
    setLoading(true)
  }
  const blankState = () => {
    setError(null)
    setFiles(null)
    setLoading(false)
  }

  useEffect(() => {
    if (isAuth && data$) {
      ;(async () => {
        try {
          statusUploadStart()
          // merge input to FormData
          const formData = new FormData()
          forOwn(data$, (value, field) => {
            if (isArray(value)) {
              // for file fields, spread
              // value: [File{}, file.name]
              formData.append(field, ...value)
            } else {
              formData.append(field, value)
            }
          })
          //
          const uploadedFiles = await upload_(formData)
          setFiles(uploadedFiles)
        } catch (error: any) {
          setError(error)
        } finally {
          setLoading(false)
        }
      })()
    }
  }, [data$, isAuth])

  useEffect(() => {
    if (!isAuth) blankState()
  }, [isAuth])

  return {
    files: files$,
    error: error$,
    loading: loading$,
    upload: setData,
  }

  async function upload_(formData: FormData): Promise<TUploadedFiles> {
    return new Promise(async (resolve, reject) => {
      const AT = user?.accessToken
      if (AT) {
        try {
          const { data: files } = await axios({
            method: "post",
            url: FILE_UPLOAD_URL,
            data: formData,
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${AT}`,
            },
          })
          if (!files) throw `bad request`

          resolve(files)
        } catch (error) {
          reject(error)
        }
      }
    })
  }
}

// const { upload } = useUploadFiles()
// const uploadedFiles =
//   await upload({
//
//     "foo": "bar",
//       ..fields
//
//     "file1": ["File{}", "filename"],
//     "file1.title": "title --1",
//     "file1.description": "description --1",
//       ..files
//   });
