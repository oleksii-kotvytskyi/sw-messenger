import { UserList } from "@/components/user-list";
import { Messages } from "@/components/messages";

import { Outlet } from "react-router-dom";
import s from "./style.module.scss";

export const Layout = () => {
  return (
    <div className={s.layout}>
      <UserList />
      <Messages />
      <Outlet />
    </div>
  );
};
