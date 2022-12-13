import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function GamestackNavbar() {
  return (
    <Navbar bg="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/"><h1 className='text-white'>Game-stack
        <img src="/game-contoller.jpeg" className="iconimage" /></h1>
        {/* <img src={process.env.PUBLIC_URL + "/game-controller.jpeg"} className="iconimage" /></h1> */}
      

        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1"><h3 className='text-white mainlink'  >Home</h3></Nav.Link>
            <Nav.Link href="#action2"><h3 className='text-white mainlink'  >Games</h3></Nav.Link>

            <Nav.Link href="#action1"><h3 className='text-white mainlink'  >Login</h3></Nav.Link>
            <Nav.Link href="#action2"><h3 className='text-white mainlink'  >SignUp</h3></Nav.Link>
            {/* <NavDropdown className='mainlink' title="Games" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item  href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown> */}
          
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button className='text-white mainlink' variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default GamestackNavbar;