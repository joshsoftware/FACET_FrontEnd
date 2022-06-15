import React from 'react';
import logo from '../../assets/images/logo.png';
import { 
    Container,
    Nav, 
    Navbar, 
    NavDropdown 
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const mapState = ({ user }) => ({
    isLoggedIn: user.isLoggedIn,
    currentUser: user.currentUser
})

const Header = () => {
    let navigate = useNavigate();

    const { isLoggedIn, currentUser } = useSelector(mapState);

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
                        {isLoggedIn?(
                            <Nav>
                                <NavDropdown title={`Welcome, ${currentUser.user}`}>
                                    <NavDropdown.Item>
                                        My Profile
                                    </NavDropdown.Item>
                                    <NavDropdown.Item>
                                        My Organizations
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item style={{color: 'red'}} onClick={handleLogout}>
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