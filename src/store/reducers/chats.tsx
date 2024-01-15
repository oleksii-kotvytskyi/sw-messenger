import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { IChat, IMessage } from "@/store/types";
import { checkChat } from "@/helpers";

type UserStateType = {
  data: IChat[];
};

const initialState: UserStateType = {
  data: sessionStorage.getItem("chats")
    ? JSON.parse(sessionStorage.getItem("chats") as string)
    : [],
};

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    createChat(state, action: PayloadAction<string>) {
      const newChat: IChat = {
        messages: [],
        id: action.payload,
      };

      state.data.push(newChat);

      sessionStorage.setItem("chats", JSON.stringify(state.data));
    },
    sendMsg(state, action: PayloadAction<IMessage>) {
      const { from, to } = action.payload;

      const chatIdx = state.data.findIndex((chat) =>
        checkChat(chat.id, from, to)
      );

      if (chatIdx !== -1) {
        state.data[chatIdx].messages.push(action.payload);
        sessionStorage.setItem("chats", JSON.stringify(state.data));
      }
    },
  },
});

export const { sendMsg, createChat } = chatsSlice.actions;

export default chatsSlice.reducer;
