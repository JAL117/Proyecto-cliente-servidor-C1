import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import ListGroup from "react-bootstrap/ListGroup";

const apiUrl = "http://localhost:3000";

const Pendientes = () => {
  const [tareas, setTareas] = useState([]);
  const [grupo, setgrupo] = useState("");
 

  useEffect(() => {
    const Usuario = JSON.parse(localStorage.getItem("Usuario"));
    setgrupo(Usuario[0].grupo);
  }, []);

  useEffect(() => {
    const obtenerTareas = async () => {
      try {
        const response = await axios.get(apiUrl + `/tareas/buscar/${grupo}`);
        setTareas(response.data);
      } catch (error) {
     
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

  const actualizarTarea = (tareaModificada) => {
    setTareas((tareas) => {
      return tareas.map((tarea) => {
        if (tarea.id === tareaModificada.id) {
          return tareaModificada;
        }
        return tarea;
      });
    });
  };

  const editarFechaTarea = async (idTarea) => {
    const { value: nuevaFecha } = await Swal.fire({
      title: "Ingrese la nueva fecha de entrega:",
      input: "date",
      showCancelButton: true,
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancelar",
      inputValidator: (value) => {
        if (!value) {
          return "Debes ingresar una fecha";
        }
      },
    });

    if (nuevaFecha) {
      try {
        await axios.put(`${apiUrl}/tareas/editar-fecha/${nuevaFecha}/${idTarea}`);
        const tareaModificada = tareas.find((tarea) => tarea.id === idTarea);
        if (tareaModificada) {
          tareaModificada.Fecha = nuevaFecha;
          actualizarTarea(tareaModificada);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="pendientes-container">
      <h2 className="text-center mb-4">Tareas Pendientes:</h2>
      <ListGroup className="d-flex align-items-center justify-content-center">
        {tareas.map((tarea, index) => (
          <ListGroup.Item className="mt-3" key={index}>
            <strong style={{ color: obtenerEstiloGrado(tarea.Grado) }}>
              {tarea.Titulo}
              <Button
                className="ms-5"
                variant="primary"
                onClick={() => editarFechaTarea(tarea.id)}
              >
                Editar fecha de entrega
              </Button>
            </strong>
            <p>{tarea.Contenido}</p>
            <p>Fecha de entrega: {tarea.Fecha}</p>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default Pendientes;