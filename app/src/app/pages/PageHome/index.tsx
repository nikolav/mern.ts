/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect } from "react"
import Button from "@mui/material/Button"

import {
  useAuthApi,
  useHandleForm,
  useSavePdf,
  useBrowser,
  useSocialLike,
} from "../../../hooks"
import { useIO } from "../../store"

export const PageHome = () => {
  const { error, processing, user, authenticate, logout, session } =
    useAuthApi()
  const socket = useIO()
  useEffect(() => {
    socket && socket.on("status:test", (m) => console.log(m))
  }, [socket])
  const { sync, handle, ok, values } = useHandleForm(
    {
      message: (v) => 3 < v.length,
    },
    {
      onSubmit: (d) => {
        console.log(d)
        return true
      },
    }
  )
  const { error: pdfError, loading: pdfLoading, savePdf } = useSavePdf()
  const { jQuery: $ } = useBrowser()
  const { like, likeCount, isLiked } = useSocialLike("@app--154")
  //
  return (
    <section>
      <button className="button" onClick={like}>
        {isLiked() ? "👎🏼" : "👍🏼"} [{likeCount}]
      </button>
      <button onClick={() => console.log($("body *"))}>ok</button>
      <button
        className="button"
        onClick={() =>
          savePdf({
            template: "test-doc",
            locals: {
              title: "title --user-nikolav",
              description: `description --${Date.now()}`,
            },
            filename: "info.pdf",
          })
        }
      >
        dl
      </button>
      <form onSubmit={handle} noValidate>
        <input
          type="text"
          onChange={sync}
          name="message"
          value={values.message}
        />
        <button className="button">{ok ? "ok" : "!ok"}</button>
      </form>
      <Button variant="contained" size="large">
        mode
      </Button>
      <button
        className="button"
        onClick={() => socket!.emit("status:test", { t: Date.now() })}
      >
        io
      </button>
      <button
        className="button"
        onClick={() =>
          authenticate({
            email: "admin@nikolav.rs",
            password: "122333",
          })
        }
      >
        login
      </button>
      <button className="button" onClick={logout}>
        logout
      </button>
      <pre>{JSON.stringify({ error, processing }, null, 2)};</pre>
      <pre>{JSON.stringify({ user, session }, null, 2)};</pre>
      <h2>@PageHome</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. A eum repellat
        consectetur, minima dolores accusamus provident culpa dicta maiores
        minus natus veniam ipsum nobis necessitatibus, voluptas in quas
        perferendis enim.
      </p>
    </section>
  )
}
