import React from "react";
import { createBrowserRouter } from "react-router";
import MainLayout from "./layouts/main-layout";
const HomePage = React.lazy(() => import("./pages/home-page"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
]);

export default router;
