import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Tareas from "../components/ListaDeTareas";
import Notificaciones from "../components/Notificaciones";
import AgregarTarea from "../components/Tarea";

const App = () => {
  const [tareas, setTareas] = useState([]);

  const agregarTarea = (nuevaTarea) => {
    setTareas([...tareas, nuevaTarea]);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {" "}
        <AgregarTarea agregarTarea={agregarTarea} />
        <Tareas tareas={tareas} />
        <Notificaciones />
      </div>
    </div>
  );
};

export default App;
