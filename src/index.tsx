import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Layout } from "@/components/layout";
import "./index.css";

const container = document.getElementById("root") as HTMLElement;

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<div style={{ color: "red" }}>Test</div>} />
    </Route>
  )
);

export const RootApplication = () => {
  return <RouterProvider router={router} />;
};

const root = createRoot(container);

root.render(<RootApplication />);
