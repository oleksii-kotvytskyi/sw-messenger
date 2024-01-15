import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/store/reducers/users";
import chatReducer from "@/store/reducers/chats";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    users: userReducer,
    chats: chatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
