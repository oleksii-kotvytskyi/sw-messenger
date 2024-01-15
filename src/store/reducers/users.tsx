import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { IUser } from "@/store/types";

type UserStateType = {
  data: IUser[];
  activeUser: IUser | null;
};

const initialState: UserStateType = {
  data: sessionStorage.getItem("userList")
    ? JSON.parse(sessionStorage.getItem("userList") as string)
    : [],
  activeUser: sessionStorage.getItem("user")
    ? JSON.parse(sessionStorage.getItem("user") as string)
    : null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    signIn(state, action) {
      state.activeUser = action.payload;
      sessionStorage.setItem("user", JSON.stringify(action.payload));
    },
    addUserToList(state, action: PayloadAction<IUser>) {
      if (state.data.find((user) => user.name === action.payload.name)) return;
      state.data.push(action.payload);

      sessionStorage.setItem("userList", JSON.stringify(state.data));
    },
    updateUser(state, action: PayloadAction<IUser>) {
      const index = state.data.findIndex(
        (user) => user.name === action.payload.name
      );

      state.data[index] = action.payload;
    },
    removeUser(state, action: PayloadAction<string>) {
      state.data.filter((user) => user.name === action.payload);
      state.activeUser = null;
    },
  },
});

export const { addUserToList, signIn, removeUser, updateUser } =
  usersSlice.actions;

export default usersSlice.reducer;
