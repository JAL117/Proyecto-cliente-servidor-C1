import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import LayoutInicial from "./pages/LayoutInicial";
import Login from "./pages/Login";
import Tareas from "./pages/Tareas";
import "react-toastify/dist/ReactToastify.css";
import Inicio from "./pages/Inicio";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="inicio" element={<Inicio />} />
      
          <Route path="tareas" element={<Tareas />} />
        </Route>
        <Route path="/" element={<LayoutInicial />}>
          <Route index element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);