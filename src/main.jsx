import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout";
import LayoutInicial from "./pages/LayoutInicial";
import Login from "./pages/Login";
import Tareas from "./pages/Tareas";
import Chat from "./pages/Chat";

const router = createBrowserRouter([
  {
    path: "/inicio",
    element: <Layout />,
    children: [
      {
        index: true,
        path: "tareas",
        element: <Tareas/>,
      },{
        path:"chat",
        element:<Chat/>,
      },
  
    ],
  },
  {
    path: "/",
    element: <LayoutInicial />,
    children: [
      {
        index: true,
        element: <Login/>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
