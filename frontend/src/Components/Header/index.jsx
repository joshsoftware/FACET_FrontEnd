import React, { useState } from 'react';
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
    const [showAddAdminModal, setShowAddAdminModal] = useState(false);

    const { isLoggedIn, currentUser } = useSelector(mapState);

    const handleLogout = () => {
        dispatch(signOutStart());
    }

    return (
        <Navbar bg='dark' sticky="top" variant='dark' expand='lg'>
            {isLoggedIn&&currentUser.is_super_admin&&(
                <AddAdminModal show={showAddAdminModal} handleClose={() => setShowAddAdminModal(false)} />
            )}
            <Container fluid>
                <Navbar.Brand>
                    <Link to="/dashboard">
                        <img 
                            src={logo}
                            width={100}
                            alt="Facet"
                        />
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='facet-navbar-nav' />
                <Navbar.Collapse id='facet-navbar-nav'>
                    <Nav className='me-auto'>
                        <Nav.Link onClick={() => navigate('/dashboard')}>Home</Nav.Link>
                        {isLoggedIn&&currentUser.is_super_admin&&(
                            <Nav.Link onClick={() => setShowAddAdminModal(true)}>Add Admin</Nav.Link>
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