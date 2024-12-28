import React from "react";
import { createBrowserRouter } from "react-router";
import MainLayout from "./layouts/main-layout";
const HomePage = React.lazy(() => import("./pages/ver1/home-page"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/version1",
        element: <HomePage />,
      },
    ],
  },
]);

export default router;
