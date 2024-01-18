import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, NavLink } from 'react-router-dom';

const LoginFormulario = () => {
  const [formData, setFormData] = useState({
    usuario: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
 
    console.log('Datos de inicio de sesión:', formData);
  };

  return (
    <div className="container d-flex justify-content-center mt-5">
      <div className="col-md-6">
        <h2 className="text-center mb-4">Inicio de Sesión</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="usuario">
            <Form.Label>Usuario:</Form.Label>
            <Form.Control
              type="usuario"
              name="usuario"
              placeholder="Ingresa tu correo nombre de usuario"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="password" className='mt-3'>
            <Form.Label>Contraseña:</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Ingresa tu contraseña"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 mt-5" as={Link} to="/inicio">
          Iniciar Sesión
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default LoginFormulario;
