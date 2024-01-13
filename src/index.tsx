import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { Layout } from "@/components/layout";
import { SignIn } from "@/components/sign-in";
import { Provider } from "react-redux";
import { store } from "@/store";
import "./index.css";

const container = document.getElementById("root") as HTMLElement;

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<SignIn />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  )
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
