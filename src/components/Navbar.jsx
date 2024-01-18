import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { IoMdChatboxes } from 'react-icons/io';
import { AiFillSnippets } from 'react-icons/ai';

function CollapsibleExample() {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/inicio" className="ms-5">
          Control 1.0
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ms-5">
            <Nav.Link href="/inicio/tareas">
              Tareas <AiFillSnippets />
            </Nav.Link>
            <Nav.Link href="/inicio/chat">
              Chat <IoMdChatboxes />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Container className="ms-5">
        <Navbar.Brand href="/" className="ms-5">
          Salir
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;
