import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import "../styles/pendientes.css"

const apiUrl = "http://localhost:3000";

const Pendientes = () => {
  const [tareas, setTareas] = useState([]);
  const [grupo, setGrupo] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const Usuario = JSON.parse(localStorage.getItem("Usuario"));
    setGrupo(Usuario[0].grupo);
    setUserName(Usuario[0].nombreDeUsuario);
  }, []);

  useEffect(() => {
    const obtenerTareas = async () => {
      try {
        const response = await axios.get(apiUrl + `/tareas/buscar/${grupo}`);
        setTareas(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    obtenerTareas();

    const interval = setInterval(() => {
      obtenerTareas();
    }, 3000);

    return () => clearInterval(interval);
  }, [grupo]);

  const obtenerEstiloGrado = (grado) => {
    switch (grado) {
      case "Alto":
        return "red";
      case "Medio":
        return "orange";
      case "Bajo":
        return "green";
      default:
        return "black";
    }
  };

  const eliminarTarea = async (id_tarea) => {
    try {
      await axios.delete(apiUrl + `/tareas/eliminar/${grupo}`, { data: { id: id_tarea } });
      // Actualizar la lista de tareas después de eliminar una
      setTareas(tareas.filter(tarea => tarea.id !== id_tarea));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="pendientes-container">
      <h1 className="text-center">Bienvenido: {userName}</h1>
      <h3 className="text-center mb-5">Grupo: "{grupo}"</h3>
      <h2 className="text-center mb-4">Tareas Pendientes:</h2>
      <div className="grid-container">
        {tareas.map((tarea) => (
          <Card key={tarea.id} className="mt-3">
            <Card.Body>
              <Card.Title style={{ color: obtenerEstiloGrado(tarea.Grado) }}>
                {tarea.Titulo}
              </Card.Title>
              <Card.Text>{tarea.Contenido}</Card.Text>
              <Card.Text>Fecha de entrega: {tarea.Fecha}</Card.Text>
              <Button variant="success" onClick={() => eliminarTarea(tarea.id)}>
                Realizada
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Pendientes;
