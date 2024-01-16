import { ServiceMsgType, IChat } from "@/store/types";

export const stateToServiceWorker = <T>(data: ServiceMsgType<T>) => {
  const sw = navigator.serviceWorker;
  if (sw?.controller) {
    sw.controller.postMessage(data);
  }
};

export const isUsersDoNotHaveChat = (
  chats: IChat[],
  user1: string,
  user2: string
) => {
  if (!user1 || !user2) return false;

  return (
    !chats.find((chat) => chat.id?.includes(user1)) ||
    !chats.find((chat) => chat.id?.includes(user2))
  );
};

export const isUsersHaveChat = (
  chats: IChat[],
  user1: string,
  user2: string
) => {
  if (!user1 || !user2) return false;

  return (
    chats.find((chat) => chat.id?.includes(user1)) &&
    chats.find((chat) => chat.id?.includes(user2))
  );
};

export const checkChat = (
  chatId: string,
  userName1: string,
  userName2: string
) => {
  return chatId.includes(userName1) && chatId.includes(userName2);
};

export const scrollToBottomList = () => {
  const list = document.getElementById("message-list");

  if (list) {
    // scroll to bottom when send a msg
    setTimeout(() => {
      list.scrollTop = list.scrollHeight;
    }, 0);
  }
};
