import { ServiceMsgType } from "@/store/types";

export const stateToServiceWorker = <T>(data: ServiceMsgType<T>) => {
  const sw = navigator.serviceWorker;
  if (sw?.controller) {
    sw.controller.postMessage(data);
  }
};
