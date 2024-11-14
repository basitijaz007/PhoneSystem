import { configureStore } from "@reduxjs/toolkit";
import callReducer from "../features/call/callSlice";

export const store = configureStore({
  reducer: {
    call: callReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ["call.device", "call.currentCall"],
      },
    }),
});
