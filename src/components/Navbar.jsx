import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { IoMdChatboxes } from 'react-icons/io';
import { AiFillSnippets } from 'react-icons/ai';
import { IoExit } from "react-icons/io5";

function CollapsibleExample() {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary mb-5">
      <Container>
        <Navbar.Brand href="/inicio" className="ms-5">
          Tareas NET
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ms-5">
            <Nav.Link href="/tareas">
              Tareas <AiFillSnippets />
            </Nav.Link>
            <Nav.Link href="/chat">
              Chat <IoMdChatboxes />
            </Nav.Link>
            <Nav.Link href="/" className="ms-5">
          Salir <IoExit/>
        </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    
    </Navbar>
  );
}

export default CollapsibleExample;
