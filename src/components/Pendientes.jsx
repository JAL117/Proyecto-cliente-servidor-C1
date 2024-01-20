import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';

const apiUrl = "http://localhost:3000";

const Pendientes = () => {
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    obtenerTareas();
  }, []);

  const obtenerTareas = async () => {
    try {
  
      const id_usuario = localStorage.getItem('id_usuario');

  
      const response = await axios.get(apiUrl + `/tareas?id_usuario=${id_usuario}`);
      setTareas(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerEstiloGrado = (grado) => {
    switch (grado) {
      case 'Alto':
        return 'red';
      case 'Medio':
        return 'yellow';
      case 'Bajo':
        return 'green';
      default:
        return 'black';
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center">
        <div >
      <h2>Lista de Tareas pendientes:</h2>
      <ul className="list-group mt-5">
        {tareas.map((tarea, index) => (
          <li key={index} className="list-group-item">
            <strong style={{ color: obtenerEstiloGrado(tarea.Grado) }}>{tarea.Titulo}</strong>
            <p>{tarea.Contenido}</p>
            <p>Fecha de entrega: {tarea.Fecha}</p> 
          </li>
        ))}
      </ul>
    </div>
    </Container>
  
  );
};

export default Pendientes;