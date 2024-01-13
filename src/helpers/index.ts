import { IUser } from "@/store/types";

export const stateToServiceWorker = (data: IUser | string[]) => {
  const sw = navigator.serviceWorker;

  if (sw?.controller) {
    sw.controller.postMessage(data);
  }
};
