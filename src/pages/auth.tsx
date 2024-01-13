import { useAppSelector } from "@/store/hooks";
import { useNavigate, Outlet } from "react-router-dom";
import { appPath, signInPath } from "@/pages/urls";
import { useEffect } from "react";

export const Auth = () => {
  const activeUser = useAppSelector((state) => state.users.activeUser);
  const navigate = useNavigate();
  const sw = navigator.serviceWorker;

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
    if (!activeUser) navigate(signInPath);
    else navigate(appPath);
  }, [activeUser, navigate]);

  return <Outlet />;
};
