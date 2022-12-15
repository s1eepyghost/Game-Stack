import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import SignUpForm from './SignUpForm';

import Auth from '../utils/auth';

function NavScrollExample() {

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand>Game Stack</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/games">Games</Nav.Link>
              <NavDropdown title="More" id="navbarScrollingDropdown">
                <NavDropdown.Item href="/about">About</NavDropdown.Item>
                <NavDropdown.Item href="/contact">
                  Contact
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Login/Signup
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            {/* todo: put login/signup/logout buttons here */}
              <Nav className="d-flex">
                {Auth.loggedIn() ? (
                  <>
                  Logged in, this isn't finished yet
                  </>
                ) : (
                  <Nav.Link onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link>
                )}
              </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* set up signup/login modal */}
      <Modal>

      </Modal>
    </>
  );
}
export default NavScrollExample;

