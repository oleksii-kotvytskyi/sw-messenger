import { Card, Typography, Input, Button } from "antd";
import { useEffect, useState } from "react";
import s from "./style.module.scss";
import { ArrowRightOutlined } from "@ant-design/icons";

const { Text } = Typography;

const Message = ({ message }: { message: string }) => {
  return (
    <Card className={s.message} bodyStyle={{ padding: "5px" }}>
      <Text className={s.messageBody}>{message}</Text>
    </Card>
  );
};

export const Messages = () => {
  const sw = navigator.serviceWorker;
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (sw) {
      window.addEventListener("load", () => {
        sw.register("./send-messages.ts")
          .then(() => sw.ready)
          .then(() => {
            sw.addEventListener("message", ({ data }) => {
              if (data?.state !== undefined) {
                setMessages(data.state);
              }
            });
          });
      });
    }
  }, [setMessages, sw]);

  const stateToServiceWorker = (data: { state: string[] }) => {
    if (sw?.controller) {
      sw.controller.postMessage(data);
    }
  };

  const sendMessage = (msg: string) => {
    stateToServiceWorker({
      state: [...messages, msg],
    });

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
