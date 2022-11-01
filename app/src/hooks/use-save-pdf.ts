import { useState, useEffect } from "react"
import axios from "axios"
import qs from "qs"
import { saveAs } from "file-saver"
import { PDF_DOWNLOAD_URI } from "../app/store"
import { merge, stripEndSlashes } from "../util"

interface IPdfTemplateVariables {
  [key: string]: string | number
}
interface ITemplateDescription {
  locals?: IPdfTemplateVariables
  template?: string
  filename?: string
  config?: any
  _key?: number
}

const CONFIG = {
  http: {
    headers: {},
  },
  defaultPdfTemplate: "test-doc",
  defaultPdfFilename: "out.pdf",
}

export const useSavePdf = () => {
  const [loading$, setLoading] = useState(false)
  const [error$, setError] = useState<any>()
  const [pdf$, setPdf] = useState<ITemplateDescription>()
  const fetchStart_ = () => {
    setError(null)
    setLoading(true)
  }

  const save_ = ({
    locals = {},
    template = CONFIG.defaultPdfTemplate,
    filename = CONFIG.defaultPdfFilename,
    config = {},
  }) =>
    new Promise(async (resolve, _reject) => {
      let file = null
      try {
        fetchStart_()
        const options = merge({}, CONFIG, config)

        const { data: bufferPdf } = await axios({
          method: "post",
          url: `${stripEndSlashes(PDF_DOWNLOAD_URI)}/${template}`,
          responseType: "arraybuffer",
          data: qs.stringify(locals),
          headers: options.http?.headers,
        })

        file = await saveAs(new Blob([bufferPdf]), filename)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }

      resolve(file)
    })

  useEffect(() => {
    if (pdf$) save_(pdf$)
  }, [pdf$])

  return {
    error: error$,
    loading: loading$,
    savePdf: (pdf$: ITemplateDescription) =>
      setPdf({ ...pdf$, _key: Date.now() }),
  }
  //
}
