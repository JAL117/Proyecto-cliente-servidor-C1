import React from 'react';

const Tareas = ({ tareas }) => {
  return (
    <div className="col-md-6">
      <h2 className="text-center mb-4">Lista de Tareas</h2>
      <ul className="list-group">
        {tareas.map((tarea, index) => (
          <li key={index} className="list-group-item">
            <strong>{tarea.titulo}</strong>
            <p>{tarea.contenido}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tareas;
