import { IUser } from "@/store/types";
import { Avatar } from "@/components/avatar";
import s from "./style.module.scss";
import cx from "classnames";
import { useEffect, useMemo, useState } from "react";
import { MenuOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { useAppSelector } from "@/store/hooks";
import { updateUser } from "@/store/reducers/users";

const { Search } = Input;

const Chat = ({ user, isOpen }: { user: IUser; isOpen: boolean }) => {
  useEffect(() => {
    updateUser({ ...user, online: navigator.onLine });
  }, [user.name]);

  return (
    <Button ghost key={user.name} className={s.chatsChat}>
      {user.online ? "TRUE" : "FALSE"}
      <Avatar name={user.name} />
      {isOpen && (
        <div>
          <p>{user.name}</p>
          <p>{user.lastMessage}</p>
        </div>
      )}
    </Button>
  );
};

export const UserList = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const users = useAppSelector((state) => state.users.data);
  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.name?.toLowerCase().includes(searchValue?.toLowerCase())
    );
  }, [searchValue, users]);

  const onChange = (e) => {
    setSearchValue(e.target.value);
  };

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
        {isOpen && <Search value={searchValue} onChange={onChange} />}
      </div>
      <div className={s.chatsMain}>
        {filteredUsers.map((user) => {
          return <Chat key={user.name} user={user} isOpen={isOpen} />;
        })}
      </div>
    </div>
  );
};
