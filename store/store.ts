import { configureStore } from "@reduxjs/toolkit";
import useReducer from "../slices/userSlice";

export function makeStore() {
  return configureStore({
    reducer: {
      user: useReducer,
      // Add the generated reducer as a specific top-level slice
      // So we can later use: `state.counter`
    },
  });
}

export const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
