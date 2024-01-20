import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import axios from 'axios';

const apiUrl = "http://localhost:3000";

const AgregarTarea = ({ agregarTarea }) => {
  const [id_usuario, setid_usuario] = useState("");

  useEffect(() => {
    const Usuario = JSON.parse(localStorage.getItem('Usuario'));
    setid_usuario(Usuario[0].id_usuario);
    console.log(Usuario);
  }, []);

  const [nuevaTarea, setNuevaTarea] = useState({
    titulo: '',
    contenido: '',
    fecha: '',
    grado: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevaTarea({
      ...nuevaTarea,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(id_usuario);

    axios
      .post(apiUrl + `/tareas/add`, {
        id_usuario: id_usuario,
        Titulo: nuevaTarea.titulo,
        Fecha: nuevaTarea.fecha,
        Grado: nuevaTarea.grado,
        Contenido: nuevaTarea.contenido
      })
      .then((response) => {
        agregarTarea(response.data);
        setNuevaTarea({
          titulo: '',
          contenido: '',
          fecha: '',
          grado: ''
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="col-md-5">
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
          <label htmlFor="fecha" className="form-label">
            Fecha de entrega:
          </label>
          <input
            type="date"
            className="form-control"
            id="fecha"
            name="fecha"
            value={nuevaTarea.fecha}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="grado">Grado de importancia:</label>
          <Form.Control
            as="select"
            className="form-control"
            id="grado"
            name="grado"
            value={nuevaTarea.grado}
            onChange={handleChange}
            required
          >
            <option value="">Seleccionar</option>
            <option value="Alto">Alto</option>
            <option value="Medio">Medio</option>
            <option value="Bajo">Bajo</option>
          </Form.Control>
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