import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

const apiUrl = "http://localhost:3000";

const Tareas = () => {
  const [tareas, setTareas] = useState([]);
  const [grupo, setgrupo] = useState("");

  useEffect(() => {
    const Usuario = JSON.parse(localStorage.getItem('Usuario'));
    setgrupo(Usuario[0].grupo);
  }, []);

  const obtenerTareas = async () => {
    try {
      const response = await axios.get(apiUrl + `/tareas/buscar/${grupo}`);
      setTareas(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    obtenerTareas();
  }, [grupo]);

  const longPolling = async () => {
    try {
      const response = await axios.get(apiUrl + `/tareas/long-polling?idUltimaTarea=${tareas.length > 0 ? tareas[tareas.length - 1].id : 0}`);
      
      if (response.data.length > 0) {
        setTareas(prevTareas => [...prevTareas, ...response.data]);
      }

      longPolling();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    longPolling();

    return () => {
      // Limpiar cualquier acción necesaria al desmontar el componente
    };
  }, []); // No necesitamos dependencias aquí

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
      await axios.delete(apiUrl + `/tareas/eliminar/${grupo}`, { data: { id: id_tarea } });
      // Al eliminar una tarea, volvemos a obtener todas las tareas
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
