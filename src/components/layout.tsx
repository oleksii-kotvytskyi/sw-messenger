import { Chats } from "@/components/chats";
import { Messages } from "@/components/messages";

import s from "./style.module.scss";

export const Layout = () => {
  return (
    <div className={s.layout}>
      <Chats />
      <Messages />
    </div>
  );
};
