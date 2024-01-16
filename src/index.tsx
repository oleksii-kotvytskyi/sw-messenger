import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { Compound } from "@/components/compound";
import { SignIn } from "@/components/sign-in";
import { Auth } from "@/pages/auth";
import { Provider } from "react-redux";
import { store } from "@/store";
import "./index.css";

const container = document.getElementById("root") as HTMLElement;

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Auth />}>
      <Route path="sign-in" element={<SignIn />} />
      <Route path="app/*">
        <Route index element={<Compound />} />
        <Route path=":chatId" element={<Compound />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  ),
  { basename: "/sw-messenger" }
);

export const RootApplication = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

const root = createRoot(container);

root.render(<RootApplication />);
