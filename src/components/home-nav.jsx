import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../logo192.jpeg';
import './components.css';

function HomeNavigation() {
    return(
        <Navbar bg="light" expand="lg">
        <Container fluid>
            <Navbar.Brand href="/" id='brandlogo'>
                <img alt="Logo" src={logo} width="30" height="30" className="d-inline-block align-top" />
                {'Voice Controlled Attendance System'}
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <NavDropdown title="Staff" id="basic-nav-dropdown" className="nav-menu">
                        <NavDropdown.Item href="/staff">Staff Profile</NavDropdown.Item>
                        <NavDropdown.Item href="/staff-register">Staff Registration</NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Student" id="basic-nav-dropdown" className="nav-menu">
                        <NavDropdown.Item href="/student">Student Attendance</NavDropdown.Item>
                        <NavDropdown.Item href="/student-register">Student Registration</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Nav>
                    <Nav.Link href="#" className="nav-menu">About</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    )
}

export default HomeNavigation;