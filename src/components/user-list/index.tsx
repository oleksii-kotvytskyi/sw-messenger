import { IUser } from "@/types";
import { Avatar } from "@/components/avatar";
import s from "./style.module.scss";
import cx from "classnames";
import { useState } from "react";
import Input, { SearchProps } from "antd/lib/input";
import { MenuOutlined, MessageOutlined } from "@ant-design/icons";
import { Button } from "antd";
const { Search } = Input;

const users: IUser[] = [
  {
    firstName: "Oleksii",
    lastName: "Kot",
    avatar: null,
    id: "1",
    lastMessage: "hello",
  },
  { firstName: "Olena", lastName: "Ol", avatar: null, id: "2" },
];

const Chat = ({ user, isOpen }: { user: IUser; isOpen: boolean }) => {
  return (
    <Button ghost key={user.id} className={s.chatsChat}>
      <Avatar firstName={user.firstName} lastName={user.lastName} />
      {isOpen && (
        <div>
          <p>
            {user.firstName} {user.lastName}
          </p>
          <p>{user.lastMessage}</p>
        </div>
      )}
    </Button>
  );
};

export const UserList = () => {
  const [isOpen, setIsOpen] = useState(true);

  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);

  return (
    <div className={cx(s.chats, !isOpen && s.chatsNarrow)}>
      <div className={s.actions}>
        <Button
          ghost
          type="text"
          shape="circle"
          className={s.actionsToggle}
          icon={<MenuOutlined />}
          onClick={() => setIsOpen(!isOpen)}
        />
        {isOpen && <Search onSearch={onSearch} />}
      </div>
      <div className={s.chatsMain}>
        {users.map((user) => {
          return <Chat user={user} isOpen={isOpen} />;
        })}
      </div>
    </div>
  );
};
