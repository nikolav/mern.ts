// src/mocks/handlers.js
import { rest } from "msw"

export const handlers = [
  rest.get("http://localhost:3001/msw-test", (req, res, ctx) =>
    res(ctx.status(200), ctx.json({ status: "ok" }))
  ),

  rest.post("http://localhost:3001/v1/auth/login", (req, res, ctx) =>
    res(
      ctx.status(200),
      ctx.json({
        token: {
          tokenType: "Bearer",
          expiresIn: "2022-11-08T12:51:46.294Z",
          accessToken: "test",
          sessionToken: "test",
          refreshToken: "test",
        },
        user: {
          id: "122333",
          email: "admin@nikolav.rs",
          role: "user",
          createdAt: "2022-11-01T08:38:05.015Z",
        },
      })
    )),

  rest.post("http://localhost:3001/v1/mail/text-message", (req, res, ctx) =>
    res(ctx.status(201), ctx.json({ messageId: "test" }))),

  rest.post("http://localhost:3001/v1/session/122333", (req, res, ctx) =>
    res(ctx.json({ test: "test" }))),

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
