export interface IUser {
  name: string;
  avatar?: string;
  lastMessage?: string;
  online: boolean;
}

export interface ServiceMsgType<T> {
  data: T;
  type: "send-msg" | "log-in" | "update-user";
}
