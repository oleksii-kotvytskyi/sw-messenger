import { UserList } from "@/components/user-list";
import s from "./style.module.scss";

const messages = [
  {
    time: new Date(),
    from: "Oleksii",
    to: "Olena",
    message: "Hola!",
  },
];

const Messages = () => {
  return (
    <div>
      {messages.map((message) => {
        return <div key={message.message}>{message.message}</div>;
      })}
    </div>
  );
};

export const Layout = () => {
  return (
    <div className={s.layout}>
      <UserList />
      <Messages />
    </div>
  );
};
