import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

const AgregarTarea = ({ agregarTarea }) => {
  const [nuevaTarea, setNuevaTarea] = useState({
    titulo: '',
    contenido: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevaTarea({
      ...nuevaTarea,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    agregarTarea(nuevaTarea);
    setNuevaTarea({
      titulo: '',
      contenido: '',
    });
  };

  return (
    <div className="col-md-3">
      <h2 className="text-center mb-4">Agregar Tarea</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="titulo" className="form-label">
            Título:
          </label>
          <input
            type="text"
            className="form-control"
            id="titulo"
            name="titulo"
            value={nuevaTarea.titulo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="titulo" className="form-label">
           Fecha
          </label>
          <input
            type="text"
            className="form-control"
            id="titulo"
            name="titulo"
            value={nuevaTarea.titulo}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="titulo">
            Grado de importancia
          </label>
        <Form className='mt-3'>
      {['radio'].map((type) => (
        <div key={`inline-${type}`} className="mb-3">
          <Form.Check
            inline
            label="Alto"
            name="group1"
            type={type}
            id={`inline-${type}-1`}
          />
          <Form.Check
            inline
            label="Mediio"
            name="group1"
            type={type}
            id={`inline-${type}-2`}
          />
          <Form.Check
            inline
            label="Bajo"
            name="group1"
            type={type}
            id={`inline-${type}-3`}
          />
        </div>
      ))}
    </Form>
        </div>
       
        <div className="mb-3">
          <label htmlFor="contenido" className="form-label">
            Contenido:
          </label>
          <textarea
            className="form-control"
            id="contenido"
            name="contenido"
            rows="4"
            value={nuevaTarea.contenido}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Agregar Tarea
        </button>
      </form>
    </div>
  );
};

export default AgregarTarea;
