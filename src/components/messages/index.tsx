import { Card, Typography, Input, Button } from "antd";
import { useEffect, useMemo, useRef, useState } from "react";
import s from "./style.module.scss";
import { ArrowRightOutlined } from "@ant-design/icons";
import { checkChat, isUsersHaveChat, stateToServiceWorker } from "@/helpers";
import { IMessage, ServiceMsgType } from "@/store/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { sendMsg } from "@/store/reducers/chats";
import { Navigate, useParams } from "react-router-dom";
import { appPath } from "@/pages/urls";
import cx from "classnames";
import BgPattern from "@/assets/pattern.svg";

const { Text } = Typography;

const Message = ({ message }: { message: IMessage }) => {
  const { chatId } = useParams();

  return (
    <Card
      className={cx(
        s.message,
        chatId === message.from ? s.messageMine : s.messageFrom
      )}
      bodyStyle={{ padding: "5px" }}
    >
      <Text className={s.messageBody}>{message.message}</Text>
    </Card>
  );
};

export const Messages = () => {
  const dispatch = useAppDispatch();
  const chats = useAppSelector((state) => state.chats.data);
  const activeUser = useAppSelector((state) => state.users.activeUser);
  const refUser = useRef(activeUser);
  const { chatId } = useParams();

  useEffect(() => {
    refUser.current = activeUser;
  }, [activeUser]);

  const messages = useMemo(() => {
    if (activeUser?.name && chatId) {
      return (
        chats.find((chat) => checkChat(chat.id, activeUser.name, chatId))
          ?.messages || []
      );
    }

    return [];
  }, [chatId, chats, activeUser?.name]);

  const [input, setInput] = useState("");
  const sw = navigator.serviceWorker;

  useEffect(() => {
    if (sw) {
      sw.addEventListener(
        "message",
        ({ data }: { data: ServiceMsgType<IMessage> }) => {
          if (data?.type === "send-msg") dispatch(sendMsg(data.data));
        }
      );
    }
  }, [dispatch, sw]);

  const pressSend = (msg: string) => {
    if (activeUser?.name && chatId) {
      // const chatMsgId = chatId + activeUser?.name;

      const message: IMessage = {
        timestamp: new Date(),
        message: msg,
        from: activeUser?.name,
        to: chatId,
      };

      // console.log(checkChat(chatMsgId, activeUser.name, chatId));

      stateToServiceWorker({
        data: message,
        type: "send-msg",
      });
      dispatch(sendMsg(message));
    }
  };

  const handleSend = () => {
    if (input) {
      pressSend(input);
      setInput("");
    }
  };

  if (!isUsersHaveChat(chats, activeUser?.name || "", chatId || "") && chatId) {
    return <Navigate to={appPath} />;
  }

  if (!chatId)
    return (
      <div
        className={s.messages}
        style={{ background: `url('${BgPattern}')` }}
      />
    );

  return (
    <div className={s.messages} style={{ background: `url('${BgPattern}')` }}>
      {messages?.length > 0 ? (
        <div className={s.list}>
          {messages.map((msg, i) => {
            return <Message message={msg} key={i} />;
          })}
        </div>
      ) : (
        <div>No messages were sent yet</div>
      )}

      <div className={s.messagesAction}>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onPressEnter={handleSend}
        />

        <Button
          ghost
          shape="circle"
          size="large"
          onClick={handleSend}
          disabled={!input}
          style={{ backgroundColor: "#212121" }}
          icon={
            <ArrowRightOutlined
              style={{
                scale: "1.2",
                color: !input ? "white" : "inherit",
              }}
            />
          }
        />
      </div>
    </div>
  );
};
