import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, ListGroup } from 'react-bootstrap';
import io from 'socket.io-client';


const socket = io('http://localhost:3000');

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [roomList, setRoomList] = useState([
    'Cliente servidor',
    'Arquitectura de software',
    'Inglés V',
    'Matemáticas II',
    'Ética',
  ]);
  const [selectedRoom, setSelectedRoom] = useState('');

  useEffect(() => {

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

      socket.emit('join room', selectedRoom);


      socket.on('load messages', (loadedMessages) => {
        setMessages(loadedMessages);
      });

      socket.on('chat message', (data) => {
        setMessages((prevMessages) => [...prevMessages, data.message]);
      });

      return () => {
        socket.emit('leave room', selectedRoom);
        socket.off('load messages');
        socket.off('chat message');
     
        setMessages([]);
      };
    }
  }, [selectedRoom]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message && selectedRoom) {
   
      socket.emit('chat message', { message, room: selectedRoom });
  
      setMessages((prevMessages) => [...prevMessages, message]);

      setMessage('');
    }
  };

  const handleRoomClick = (room) => {
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
                    {msg.message}
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
