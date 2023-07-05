import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function TopMenuLinks() {
  return (
    <Navbar expand="lg" className="navbar navbar-expand-sm bg-dark navbar-dark">
      <Container>
        <Navbar.Brand href="#home">CatenaX - CompanyName</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Favorites <span className="badge rounded-pill text-bg-primary" id="favorites-count">0</span></Nav.Link>
            <Nav.Link href="#link">Alerts <span className="badge rounded-pill text-bg-danger" id="alerts-count">0</span></Nav.Link>
            <Nav.Link href="#link">Status + <span className="badge rounded-pill text-bg-success" id="status-plus-count">0</span> </Nav.Link>
            <Nav.Link href="#link">Status - <span className="badge rounded-pill text-bg-danger" id="status-minus-count">0</span> </Nav.Link>
            <Nav.Link href="#link">ToDo <span className="badge rounded-pill text-bg-warning" id="todo-count">0</span> </Nav.Link>
            <Nav.Link href="#link">Events <span className="badge rounded-pill text-bg-info" id="events-count">0</span></Nav.Link>
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>*/} 
          </Nav>
        </Navbar.Collapse>

        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="#login">USERID</a>
          </Navbar.Text>
          <Nav.Link href="#link" className="p-3 navbar-nav nav-item">Settings</Nav.Link>
          <Nav.Link href="#link" className="p-2 navbar-nav nav-item">Log Out</Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TopMenuLinks;