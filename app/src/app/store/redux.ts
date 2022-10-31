import { configureStore } from "@reduxjs/toolkit"
import AppDataReducer from "./appdata"
import colorModeTw from "./color-mode-tw"

export const store = configureStore({
  reducer: {
    appdata: AppDataReducer,
    colorMode: colorModeTw,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
