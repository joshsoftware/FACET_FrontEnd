import React from 'react';
import logo from '../../assets/images/logo.png';
import { 
    Container,
    Nav, 
    Navbar, 
    NavDropdown 
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOutStart } from '../../store/User/actions';
import AddAdminModal from '../DashboardComponent/SuperAdmin/AddAdminModal';

const mapState = ({ user }) => ({
    isLoggedIn: user.isLoggedIn,
    currentUser: user.currentUser
})

const Header = () => {
    let navigate = useNavigate();
    let dispatch = useDispatch();

    const { isLoggedIn, currentUser } = useSelector(mapState);

    const handleLogout = () => {
        dispatch(signOutStart());
    }

    return (
        <Navbar bg='dark' sticky="top" variant='dark' expand='lg'>
            <AddAdminModal show={true} />
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
                        {currentUser.is_super_admin&&(
                            <Nav.Link onClick={() => navigate('/dashboard')}>Add Admin</Nav.Link>
                        )}
                    </Nav>
                    <>
                        {isLoggedIn?(
                            <Nav>
                                <NavDropdown title={`Welcome, ${currentUser.name}`}>
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