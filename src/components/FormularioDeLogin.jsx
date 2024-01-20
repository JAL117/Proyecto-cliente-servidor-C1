import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import io from 'socket.io-client';

const apiUrl = "http://localhost:3000";
const socket = io(apiUrl);

function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    socket.on('usuarioConectado', () => {
      Swal.fire({
        icon: "success",
        title: "Nuevo usuario conectado",
        text: "¡Se ha conectado un nuevo usuario!",
      });
    });
  }, []);

  const iniciarSecion = async (e) => {
    e.preventDefault();
    await axios.get(apiUrl + `/usuario/buscar/${user}&${password}`)
      .then((result) => {
        if (
          result.data.value !== undefined ||
          result.data.message !== "Usuario no encontrado"
        ) {
          localStorage.setItem("Usuario", JSON.stringify(result.data));
          socket.emit('usuarioConectado');
          navigate("/inicio");
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "El usuario y/o la contraseña son incorrectas!",
          });
        }
      })
      .catch((error) => {
        console.error("Error al obtener usuarios:", error);
      });
  };

  return (
    <Container>
      <Row className=" mt-5 align-items-center justify-content-center">
        <Col md={8} className="d-flex align-items-center justify-content-center">
          <div className="w-100">
            <h2 className="text-center mb-4" style={{color:"white"}}>Bienvenido al administrador de tareas</h2>
            <Form onSubmit={iniciarSecion}>
              <Form.Group controlId="formUsuario">
                <Form.Label> <h4>Usuario </h4></Form.Label>
                <Form.Control
                  required
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  type="text"
                  placeholder="Ingrese su usuario"
                />
              </Form.Group>
              <Form.Group controlId="formContrasena">
                <Form.Label className="mt-5"> <h4>Contraseña</h4> </Form.Label>
                <Form.Control
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Ingrese su contraseña"
                />
              </Form.Group>
              <div className="d-flex justify-content-center">
                <Button variant="dark" type="submit" className="mt-5">
                  Iniciar sesión
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;