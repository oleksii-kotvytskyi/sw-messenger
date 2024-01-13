import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from "@/store";
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
    createUser(state, action: PayloadAction<IUser>) {
      if (state.data.find((user) => user.name === action.payload.name)) return;

      state.data.push(action.payload);
      state.activeUser = action.payload;

      sessionStorage.setItem("userList", JSON.stringify(state.data));
      sessionStorage.setItem("user", JSON.stringify(action.payload));
    },
    removeUser(state, action: PayloadAction<string>) {
      state.data.filter((user) => user.name === action.payload);
      state.activeUser = null;
    },
  },
});

export const { createUser, removeUser } = usersSlice.actions;

export default usersSlice.reducer;
