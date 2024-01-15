export interface IUser {
  name: string;
  avatar?: string;
  lastMessage?: string;
  online: boolean;
  created: Date;
}

export interface IMessage {
  message: string;
  timestamp: Date;
  from: string;
  to: string;
}

export interface IChat {
  messages: IMessage[];
  id: string;
}

export interface ServiceMsgType<T> {
  data: T;
  type: "send-msg" | "log-in" | "update-user" | "create-chat";
  shouldBePosted?: boolean;
}
