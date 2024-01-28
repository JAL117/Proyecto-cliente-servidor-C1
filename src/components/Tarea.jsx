import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import axios from "axios";

const apiUrl = "http://localhost:3000";

const AgregarTarea = ({ agregarTarea }) => {
  const [grupo, setgrupo] = useState("");

  useEffect(() => {
    const Usuario = JSON.parse(localStorage.getItem("Usuario"));
    setgrupo(Usuario[0].grupo);
  }, []);

  const [nuevaTarea, setNuevaTarea] = useState({
    titulo: "",
    contenido: "",
    fecha: "",
    grado: "",
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

    console.log(grupo);

    axios
      .post(apiUrl + `/tareas/add`, {
        grupo: grupo,
        Titulo: nuevaTarea.titulo,
        Fecha: nuevaTarea.fecha,
        Grado: nuevaTarea.grado,
        Contenido: nuevaTarea.contenido,
      })
      .then((response) => {
        agregarTarea(response.data);
        setNuevaTarea({
          titulo: "",
          contenido: "",
          fecha: "",
          grado: "",
        });
      })
      .catch((error) => {
        console.log(error);
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
        <div>
          <label htmlFor="grado">Grado de importancia:</label>
          <Form className="mt-3">
            {["radio"].map((type) => (
              <div key={`inline-${type}`} className="mb-3">
                <Form.Check
                  inline
                  label="Alto"
                  name="grado"
                  type={type}
                  value="Alto"
                  onChange={handleChange}
                  id={`inline-${type}-1`}
                />
                <Form.Check
                  inline
                  label="Medio"
                  name="grado"
                  type={type}
                  value="Medio"
                  onChange={handleChange}
                  id={`inline-${type}-2`}
                />
                <Form.Check
                  inline
                  label="Bajo"
                  name="grado"
                  type={type}
                  value="Bajo"
                  onChange={handleChange}
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
