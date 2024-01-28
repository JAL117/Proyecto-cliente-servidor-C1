import React, { useEffect, useState } from 'react';
import axios from 'axios';

const apiUrl = "http://localhost:3000";

const Tareas = () => {
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
        console.log(error);
      }
    };

    obtenerTareas();
  }, [grupo]);

  useEffect(() => {
    const longPolling = async () => {
      try {
        const response = await axios.get(apiUrl + `/tareas/tareas/long-polling`);
        if (response.data.success) {
          setTareas(prevTareas => [...prevTareas, response.data.tarea]);
        }
        longPolling(); // Realizar la siguiente llamada de long polling
      } catch (error) {
        console.log(error);
      }
    };

    longPolling();

   
  }, []);


  const obtenerEstiloGrado = (grado) => {
    if (grado) {
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
    } else {
      return 'black'; 
    }
  };


  return (
    <div className="col-md-6">
      <h2 className="text-center mb-4">Mis tareas:</h2>
      <ul className="list-group">
        {tareas.map((tarea) => (
          <li key={tarea.id} className="list-group-item">
             <strong style={{ color: obtenerEstiloGrado(tarea.Grado) }}>{tarea.Titulo}
             
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
