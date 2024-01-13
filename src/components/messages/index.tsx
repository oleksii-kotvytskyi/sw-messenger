import { Card, Typography, Input, Button } from "antd";
import { useCallback, useEffect, useState } from "react";
import s from "./style.module.scss";
import { ArrowRightOutlined } from "@ant-design/icons";
import { stateToServiceWorker } from "@/helpers";
import { IUser } from "@/store/types";

const { Text } = Typography;

const Message = ({ message }: { message: string }) => {
  return (
    <Card className={s.message} bodyStyle={{ padding: "5px" }}>
      <Text className={s.messageBody}>{message}</Text>
    </Card>
  );
};

export const Messages = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const sw = navigator.serviceWorker;

  useEffect(() => {
    if (sw) {
      sw.addEventListener("message", ({ data }: { data: IUser | string[] }) => {
        // we send different data via service worker, let's check what kind of data is there to proceed with
        if (data !== undefined && Array.isArray(data)) setMessages(data);
      });
    }
  }, [setMessages, sw]);

  const sendMessage = (msg: string) => {
    stateToServiceWorker([...messages, msg]);

    setMessages([...messages, msg]);
  };

  const handleSend = () => {
    if (input) {
      sendMessage(input);
      setInput("");
    }
  };

  return (
    <div className={s.messages}>
      {messages.length > 0 ? (
        <div className={s.list}>
          {messages.map((message, i) => {
            return <Message message={message} key={i} />;
          })}
        </div>
      ) : (
        <div>No messages were send yet</div>
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
          icon={
            <ArrowRightOutlined
              style={{ scale: "1.2", color: !input ? "white" : "inherit" }}
            />
          }
        />
      </div>
    </div>
  );
};

// const messages = [
//   {
//     time: new Date(),
//     from: "Oleksii",
//     to: "Olena",
//     message: "Hola!",
//   },
// ];
