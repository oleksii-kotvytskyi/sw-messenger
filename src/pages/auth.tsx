import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { appPath, signInPath, basePath } from "@/pages/urls";
import { useEffect, useRef } from "react";
import { isUsersDoNotHaveChat, stateToServiceWorker } from "@/helpers";
import { IUser, ServiceMsgType } from "@/store/types";
import { addUserToList, updateUser } from "@/store/reducers/users";
import { createChat } from "@/store/reducers/chats";

export const Auth = () => {
  const activeUser = useAppSelector((state) => state.users.activeUser);
  const users = useAppSelector((state) => state.users.data);
  const chats = useAppSelector((state) => state.chats.data);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // refs need to get values from hooks and do side effects
  const refUser = useRef(activeUser);
  const refUsers = useRef(users);
  const refChats = useRef(chats);
  const sw = navigator.serviceWorker;

  // const warningHandler = (e: BeforeUnloadEvent) => {
  //   e.preventDefault();
  //   return "Your data will be lost!";
  // };

  useEffect(() => {
    refUsers.current = users;
  }, [users]);

  useEffect(() => {
    refChats.current = chats;
  }, [chats]);

  useEffect(() => {
    refUser.current = activeUser;
  }, [activeUser]);

  // register service worker
  // TODO is it need to check if worker already registered or not ?
  useEffect(() => {
    if (sw) {
      window.addEventListener("load", () => {
        sw.register("./worker.ts").then(() => sw.ready);
      });
    }
  }, [sw]);

  useEffect(() => {
    if (sw) {
      sw.addEventListener(
        "message",
        ({ data }: MessageEvent<ServiceMsgType<IUser>>) => {
          if (data.type === "log-in") {
            const dataName = data.data.name;
            const activeUserName = refUser?.current?.name;
            const actualChats = refChats?.current;
            const actualUsers = refUsers?.current;

            if (activeUserName !== data.data.name)
              dispatch(addUserToList(data.data));

            const createChatsFn = () => {
              actualUsers?.forEach((user) => {
                if (isUsersDoNotHaveChat(actualChats, user.name, dataName)) {
                  const chatId = user.name + dataName;
                  dispatch(createChat(chatId));
                }
              });
            };

            // create chats for users were logged-in
            if (activeUserName && dataName && activeUserName === dataName) {
              createChatsFn();
            }
            // create chats for user which was just created
            if (!activeUserName) {
              createChatsFn();
            }

            // create chat for users were logged in the start
            if (activeUserName && activeUserName !== dataName) {
              const chatId = activeUserName + dataName;
              dispatch(createChat(chatId));
            }
          }
          if (data.type === "update-user") dispatch(updateUser(data.data));
        }
      );
    }
  }, [dispatch, sw]);

  useEffect(() => {
    const visibilityHandler = () => {
      const userOn = { ...refUser?.current, online: true };
      const userOff = { ...refUser?.current, online: false };

      if (document.hidden) {
        stateToServiceWorker({
          data: userOff,
          type: "update-user",
          shouldBePosted: true,
        });
      } else
        stateToServiceWorker({
          data: userOn,
          type: "update-user",
          shouldBePosted: true,
        });
    };

    if (sw) {
      document.addEventListener("visibilitychange", visibilityHandler);
      // window.addEventListener("beforeunload", warningHandler);
    }

    return () => {
      if (sw)
        document.removeEventListener("visibilitychange", visibilityHandler);
      // window.removeEventListener("beforeunload", warningHandler);
    };
  }, [sw]);

  useEffect(() => {
    if (!activeUser) navigate(signInPath);
    if (location.pathname === basePath) navigate(appPath);
  }, [activeUser, navigate, location.pathname]);

  if (!activeUser && location.pathname !== signInPath) return null;

  return <Outlet />;
};
