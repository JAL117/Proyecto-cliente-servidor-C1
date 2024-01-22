import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

const apiUrl = "http://localhost:3000";

const Tareas = () => {
  const [tareas, setTareas] = useState([]);
  const [id_usuario, setid_usuario] = useState("");

  useEffect(() => {
    const Usuario = JSON.parse(localStorage.getItem('Usuario'));
    setid_usuario(Usuario[0].id_usuario);
  }, []);

  const obtenerTareas = async () => {
    try {
      const response = await axios.get(apiUrl + `/tareas/buscar/long-polling/${id_usuario}`);
      setTareas(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    obtenerTareas();
  }, [id_usuario]);

  const obtenerEstiloGrado = (grado) => {
    switch (grado) {
      case 'Alto':
        return 'red';
      case 'Medio':
        return 'orange';
      case 'Bajo':
        return 'green';
      default:
        return 'black';
    }
  };

  const eliminarTarea = async (id_tarea) => {
    try {
      await axios.delete(apiUrl + `/tareas/eliminar/${id_usuario}`, { data: { id: id_tarea } });
      obtenerTareas();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="col-md-6">
      <h2 className="text-center mb-4">Mis tareas:</h2>
      <ul className="list-group">
        {tareas.map((tarea) => (
          <li key={tarea.id} className="list-group-item">
            <strong style={{ color: obtenerEstiloGrado(tarea.Grado) }}>{tarea.Titulo}
              <Button className='ms-5' variant='danger' onClick={() => eliminarTarea(tarea.id)}>Eliminar</Button>
            </strong>
            <p>{tarea.Contenido}</p>
            <p>Fecha de entrega: {tarea.Fecha}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tareas;
