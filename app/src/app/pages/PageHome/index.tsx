/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect } from "react"
import Button from "@mui/material/Button"
import { useResourceMain, useApollo } from "../../../hooks/queries"
import { gql } from "@apollo/client"

import { useAuthApi, useHandleForm } from "../../../hooks"
import { useIO } from "../../store"

export const PageHome = () => {
  const { resource } = useResourceMain()
  const { error, processing, user, authenticate, logout, session } =
    useAuthApi()
  const { data } = useApollo(
    gql`
      query {
        messages {
          id
          content
        }
      }
    `
  )
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

  return (
    <section>
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
      <pre>{JSON.stringify({ resource }, null, 2)};</pre>
      <pre>{JSON.stringify({ data }, null, 2)};</pre>
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
