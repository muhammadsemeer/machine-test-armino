import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const linkStyle = { textDecoration: "none", color: "inherit" };

const NavBar = () => {
    return (
        <>
            <Navbar bg="light" variant="light">
                <Container>
                    <Navbar.Brand href="#home">Shopping</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link>
                            <Link to="/" style={linkStyle}>
                                Home
                            </Link>
                        </Nav.Link>
                        <Nav.Link>
                            <Link to="/cart" style={linkStyle}>
                                Cart
                            </Link>
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
};

export default NavBar;
