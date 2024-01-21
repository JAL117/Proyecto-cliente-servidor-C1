import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import ListGroup from "react-bootstrap/ListGroup";

const apiUrl = "http://localhost:3000";

const Pendientes = () => {
  const [tareas, setTareas] = useState([]);
  const [id_usuario, setIdUsuario] = useState("");
  const [pollingTimeout, setPollingTimeout] = useState(null);

  useEffect(() => {
    const Usuario = JSON.parse(localStorage.getItem("Usuario"));
    setIdUsuario(Usuario[0].id_usuario);
  }, []);

  useEffect(() => {
    const obtenerTareas = async () => {
      try {
        const response = await axios.get(`${apiUrl}/tareas/buscar/${id_usuario}`);
        setTareas(response.data);
      } catch (error) {
        console.log(error);
        throw error;
      }
    };

    const longPolling = async () => {
      let pollingActive = true;

      while (pollingActive) {
        try {
          await obtenerTareas();
          await new Promise((resolve) => setTimeout(resolve, 50000));
        } catch (error) {
          console.log(error);
          pollingActive = false;
        }
      }
    };

    const startPolling = async () => {
      await obtenerTareas();
      const timeoutId = setTimeout(longPolling, 50000);
      setPollingTimeout(timeoutId);
    };

    startPolling();

    return () => {
      clearTimeout(pollingTimeout);
    };
  }, [id_usuario, pollingTimeout]);

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