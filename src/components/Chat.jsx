import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, ListGroup } from 'react-bootstrap';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [roomList, setRoomList] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [id_usuario, setid_usuario] = useState("");

  useEffect(() => {
    const Usuario = JSON.parse(localStorage.getItem('Usuario'));
    setid_usuario(Usuario[0].id_usuario);
  }, []);

  useEffect(() => {
    // Obtener lista de salas al cargar la página
    socket.emit('get room list');
    socket.on('room list', (rooms) => {
      setRoomList(rooms);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (selectedRoom) {
      // Unirse a la sala y cargar mensajes antiguos
      socket.emit('join room', selectedRoom);
      socket.emit('load messages', { room: selectedRoom });

      socket.on('loaded messages', (loadedMessages) => {
        setMessages(loadedMessages);
      });

      socket.on('chat message', (data) => {
        // Agregar mensajes nuevos a la lista
        setMessages((prevMessages) => [...prevMessages, { Contenido: data.message }]);
      });

      return () => {
        // Dejar la sala al cambiar de sala o cerrar la página
        socket.emit('leave room', selectedRoom);
        socket.off('load messages');
        socket.off('chat message');
        setMessages([]);
      };
    }
  }, [selectedRoom]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message && selectedRoom) {
      try {
        // Enviar el mensaje al servidor y guardar en la base de datos
        await fetch('http://localhost:3000/chat/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id_usuario: id_usuario, // Reemplaza con el ID del usuario actual
            Contenido: message,
            Room: selectedRoom,
          }),
        });

        // Limpiar el campo de entrada
        setMessage('');
      } catch (error) {
        console.error('Error al enviar el mensaje:', error);
      }
    }
  };

  const handleRoomClick = (room) => {
    // Guardar los mensajes actuales en la base de datos antes de cambiar de sala
    socket.emit('save messages', { room: selectedRoom, messages });

    // Cambiar a la nueva sala
    setSelectedRoom(room);
  };

  return (
    <Container fluid className="chat-container">
      <Row>
        <Col sm={3} className="sidebar">
          <h1>Salas</h1>
          <ListGroup>
            {roomList.map((room) => (
              <ListGroup.Item
                key={room}
                onClick={() => handleRoomClick(room)}
                active={room === selectedRoom}
                action
              >
                {room}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col sm={9} className="chat-column">
          {selectedRoom && (
            <>
              <div className="messages-container">
                {messages.map((msg, index) => (
                  <div key={index} className="message">
                    {msg.Contenido}
                  </div>
                ))}
              </div>
              <Form onSubmit={handleSubmit} className="mt-3">
                <Row>
                  <Col sm={10}>
                    <Form.Control
                      type="text"
                      placeholder="Escribe un mensaje..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </Col>
                  <Col sm={2}>
                    <Button type="submit">Enviar</Button>
                  </Col>
                </Row>
              </Form>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;
