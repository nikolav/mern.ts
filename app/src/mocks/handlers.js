// src/mocks/handlers.js
import { rest } from "msw"

export const handlers = [
  rest.get("/msw-test", (req, res, ctx) =>
    res(ctx.status(200), ctx.json({ status: "ok" }))
  ),

  // rest.post("/login", (req, res, ctx) => {
  //   // Persist user's authentication in the session
  //   // eslint-disable-next-line no-undef
  //   sessionStorage.setItem("is-authenticated", "true")

  //   return res(
  //     // Respond with a 200 status code
  //     ctx.status(200)
  //   )
  // }),

  // rest.get("/user", (req, res, ctx) => {
  //   // Check if the user is authenticated in this session
  //   // eslint-disable-next-line no-undef
  //   const isAuthenticated = sessionStorage.getItem("is-authenticated")

  //   if (!isAuthenticated) {
  //     // If not authenticated, respond with a 403 error
  //     return res(
  //       ctx.status(403),
  //       ctx.json({
  //         errorMessage: "Not authorized",
  //       })
  //     )
  //   }

  //   // If authenticated, return a mocked user details
  //   return res(
  //     ctx.status(200),
  //     ctx.json({
  //       username: "admin",
  //     })
  //   )
  // }),
]
