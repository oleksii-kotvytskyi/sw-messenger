import { useAppSelector } from "@/store/hooks";
import { useNavigate, Outlet } from "react-router-dom";
import { appPath, signInPath } from "@/pages/urls";
import { useEffect, useRef } from "react";
import { stateToServiceWorker } from "@/helpers";

export const Auth = () => {
  const activeUser = useAppSelector((state) => state.users.activeUser);
  const navigate = useNavigate();
  const refUser = useRef(activeUser);
  const sw = navigator.serviceWorker;

  useEffect(() => {
    refUser.current = activeUser;
  }, [activeUser?.name]);

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
    const visibilityHandler = () => {
      const userOn = { ...refUser?.current, online: true };
      const userOff = { ...refUser?.current, online: false };

      if (document.hidden) {
        stateToServiceWorker({ data: userOff, type: "update-user" });
      } else stateToServiceWorker({ data: userOn, type: "update-user" });
    };

    const warningHandler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      return "Your data will be lost!";
    };

    if (sw) {
      document.addEventListener("visibilitychange", visibilityHandler);
      window.addEventListener("beforeunload", warningHandler);
    }

    return () => {
      if (sw)
        document.removeEventListener("visibilitychange", visibilityHandler);
      window.removeEventListener("beforeunload", warningHandler);
    };
  }, [sw]);

  useEffect(() => {
    if (!activeUser) navigate(signInPath);
    else navigate(appPath);
  }, [activeUser, navigate]);

  return <Outlet />;
};
