import { Chats } from "@/components/chats";
import { Messages } from "@/components/messages";

import s from "./style.module.scss";

export const Compound = () => {
  return (
    <div className={s.layout}>
      <Chats />
      <Messages />
    </div>
  );
};
