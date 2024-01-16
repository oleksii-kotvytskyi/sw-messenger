import { IUser } from "@/store/types";
import { Avatar } from "@/components/avatar";
import s from "./style.module.scss";
import cx from "classnames";
import { ChangeEvent, useMemo, useState } from "react";
import {
  ArrowLeftOutlined,
  LeftCircleFilled,
  MenuOutlined,
} from "@ant-design/icons";
import { Button, Input, Tooltip } from "antd";
import { useAppSelector } from "@/store/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { appPath, chatPath } from "@/pages/urls";
import { useView } from "@/helpers/hooks";

const { Search } = Input;

const Chat = ({ user, isOpen }: { user: IUser; isOpen: boolean }) => {
  const navigate = useNavigate();
  return (
    <Button
      ghost
      key={user.name}
      className={s.chatsChat}
      onClick={() => navigate(chatPath(user.name))}
    >
      <Avatar user={user} wrapperClassName={s.chatsChatAvatar} />

      <div className={cx(s.chatsChatName, !isOpen && s.chatsChatNameHidden)}>
        <p>{user.name}</p>
        <p>{user.lastMessage}</p>
      </div>
    </Button>
  );
};

export const Chats = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const users = useAppSelector((state) => state.users.data);
  const activeUser = useAppSelector((state) => state.users.activeUser);
  const { isMobile } = useView();
  const { chatId } = useParams();

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.name?.toLowerCase().includes(searchValue?.toLowerCase())
    );
  }, [searchValue, users]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div
      className={cx(
        s.chats,
        !isOpen && s.chatsNarrow,
        isMobile && chatId && s.chatsHidden
      )}
    >
      <div className={s.actions}>
        <Button
          ghost
          type="text"
          shape="circle"
          className={s.actionsToggle}
          icon={<MenuOutlined />}
          onClick={() => setIsOpen(!isOpen)}
        />

        <div className={s.actionsMain}>
          {chatId && isMobile ? (
            <Button
              ghost
              type="text"
              shape="circle"
              style={{ color: "white ", borderColor: "white" }}
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate(appPath)}
            />
          ) : (
            <>
              <Tooltip
                mouseEnterDelay={0.5}
                color="geekblue"
                title={<div>Me: {activeUser?.name}</div>}
              >
                <div className={cx(s.item, !isOpen && s.itemHidden)}>
                  <Avatar user={activeUser} showOnline={false} />
                </div>
              </Tooltip>
              <Search
                className={cx(s.item, !isOpen && s.itemHidden)}
                value={searchValue}
                onChange={onChange}
              />
            </>
          )}
        </div>
      </div>
      <div className={s.chatsMain}>
        {filteredUsers.map((user) => {
          return <Chat key={user.name} user={user} isOpen={isOpen} />;
        })}
      </div>
    </div>
  );
};
