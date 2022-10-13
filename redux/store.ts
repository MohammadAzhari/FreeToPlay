import { configureStore } from "@reduxjs/toolkit";
import navs from "./slices/navs";
import favo from "./slices/favo";
import filter from "./slices/filter";

export const store = configureStore({
  reducer: {
    navs,
    favo,
    filter,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
