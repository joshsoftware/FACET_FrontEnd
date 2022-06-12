import React from 'react';
import logo from '../../assets/images/logo.png';
import { 
    Container,
    Nav, 
    Navbar, 
    NavDropdown 
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    let navigate = useNavigate();

    const handleLogout = () => {

    }

    return (
        <Navbar bg='dark' variant='dark' expand='lg'>
            <Container fluid>
                <Navbar.Brand>
                    <img 
                        src={logo}
                        width={100}
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='facet-navbar-nav' />
                <Navbar.Collapse id='facet-navbar-nav'>
                    <Nav className='me-auto'>
                        <Nav.Link onClick={() => navigate('/dashboard')}>Home</Nav.Link>
                    </Nav>
                    <>
                        {localStorage.getItem('token')?(
                            <Nav>
                                <NavDropdown title={"Welcome, User"}>
                                    <NavDropdown.Item>
                                        My Profile
                                    </NavDropdown.Item>
                                    <NavDropdown.Item>
                                        My Organizations
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item color='red' onClick={handleLogout}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        ):(
                            <Nav>
                                <Link to='/login' className='btn btn-primary me-2'>Login</Link>
                                <Link to='/signup' className='btn btn-outline-primary'>Signup</Link>
                            </Nav>
                        )}
                    </>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;