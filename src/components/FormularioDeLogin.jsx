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
  const [grupo, setGrupo] = useState("");
  const navigate = useNavigate();

  const iniciarSesion = async (e) => {
    e.preventDefault();
    await axios.get(apiUrl + `/usuario/buscar/${user}&${password}`)
      .then((result) => {
        if (
          result.data.value !== undefined ||
          result.data.message !== "Usuario no encontrado"
        ) {
          localStorage.setItem("Usuario", JSON.stringify(result.data));
          setGrupo(result.data[0].grupo); // Actualizar el grupo después del inicio de sesión
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

  const registrarUsuario = async () => {
    const { value: formValues } = await Swal.fire({
      title: 'Registrar Usuario',
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Usuario">' +
        '<input id="swal-input2" class="swal2-input" placeholder="Contraseña">' +
        '<select id="swal-input3" class="swal2-select">' +
        '<option value="A">Grupo A</option>' +
        '<option value="B">Grupo B</option>' +
        '<option value="C">Grupo C</option>' +
        '</select>',
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById('swal-input1').value,
          document.getElementById('swal-input2').value,
          document.getElementById('swal-input3').value
        ];
      }
    });

    if (formValues) {
      const [newUser, newPassword, newGrupo] = formValues;
      const newId = generateId(); // Generar un ID aleatorio
      axios.post(apiUrl + '/usuario/add', {
        id_usuario: newId,
        nombreDeUsuario: newUser,
        contrasena: newPassword,
        grupo: newGrupo
      })
      .then((response) => {
        Swal.fire({
          icon: 'success',
          title: 'Usuario registrado',
          text: 'El usuario ha sido registrado exitosamente!'
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ha ocurrido un error al registrar el usuario.'
        });
      });
    }
  };

  const generateId = () => {
    return Math.floor(Math.random() * 1000000); // Genera un número entero aleatorio
  };
  

  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('usuarioConectado', grupo);
    });

    socket.on('usuarioConectado', () => {
      Swal.fire({
        icon: "success",
        title: "Nuevo usuario conectado",
        text: "¡Se ha conectado un nuevo usuario!",
      });
    });
  }, [grupo]);

  return (
    <Container>
      <Row className=" mt-5 align-items-center justify-content-center">
        <Col md={8} className="d-flex align-items-center justify-content-center">
          <div className="w-100">
            <h2 className="text-center mb-4" style={{color:"white"}}>Bienvenido al administrador de tareas</h2>
            <Form onSubmit={iniciarSesion}>
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
            <div className="d-flex justify-content-center mt-3">
              <Button variant="primary" onClick={registrarUsuario}>Registrar Usuario</Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
