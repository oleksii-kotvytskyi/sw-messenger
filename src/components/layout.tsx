import { UserList } from "@/components/user-list";
import { Messages } from "@/components/messages";
import s from "./style.module.scss";

export const Layout = () => {
  return (
    <div className={s.layout}>
      <UserList />
      <Messages />
    </div>
  );
};
