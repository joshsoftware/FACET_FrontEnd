import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AddAdminModal from "Components/DashboardComponent/SuperAdmin/AddAdminModal";
import { addAdminsRequest } from "store/SuperAdmin/actions";
import { getAllUsersRequest, signOutRequest } from "store/User/actions";

import logo from "assets/images/logo.png";

const mapState = ({ user, getUsers }) => ({
  isLoggedIn: user.isLoggedIn,
  currentUser: user.currentUser,
  allUsers: getUsers.users,
});

const Header = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();

  const {
    isLoggedIn,
    currentUser: { is_super_admin: isSuperAdmin, name: userName },
    allUsers,
  } = useSelector(mapState);

  const [showAddAdminModal, setShowAddAdminModal] = useState(false);
  const [addAdminFormData, setAddAdminFormData] = useState({ admin: [] });

  useEffect(() => {
    if (isLoggedIn && isSuperAdmin) {
      dispatch(getAllUsersRequest({ exclude: "admins" }));
    }
  }, []);

  const handleToggle = () => {
    setShowAddAdminModal(!showAddAdminModal);
    setAddAdminFormData({ admin: [] });
  };

  const handleLogout = () => {
    dispatch(signOutRequest());
  };

  const handleChangeAdminFormData = (_name, val) => {
    setAddAdminFormData((prevState) => ({
      ...prevState,
      admin: val,
    }));
  };

  const handleSubmitAdminFormData = () => {
    dispatch(
      addAdminsRequest({
        ...addAdminFormData,
        admin: addAdminFormData.admin.map((e) => e.value),
      })
    );
    handleToggle();
  };

  return (
    <Navbar bg="dark" sticky="top" variant="dark" expand="lg">
      {isLoggedIn && isSuperAdmin && (
        <AddAdminModal
          allUsers={allUsers}
          data={addAdminFormData.admin}
          onChange={handleChangeAdminFormData}
          onClose={handleToggle}
          onSubmit={handleSubmitAdminFormData}
          show={showAddAdminModal}
        />
      )}
      <Container fluid>
        <Navbar.Brand>
          <Link to="/dashboard">
            <img src={logo} width={100} alt="Facet" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="facet-navbar-nav" />
        <Navbar.Collapse id="facet-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate("/dashboard")}>Home</Nav.Link>
            {isLoggedIn && isSuperAdmin && (
              <Nav.Link onClick={handleToggle}>Add Admin</Nav.Link>
            )}
          </Nav>
          <>
            {isLoggedIn ? (
              <Nav>
                <NavDropdown title={`Welcome, ${userName}`}>
                  <NavDropdown.Item onClick={() => navigate("/profile")}>
                    My Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item>My Organizations</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    style={{ color: "red" }}
                    onClick={handleLogout}
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            ) : (
              <Nav>
                <Link to="/login" className="btn btn-primary me-2">
                  Login
                </Link>
                <Link to="/signup" className="btn btn-outline-primary">
                  Signup
                </Link>
              </Nav>
            )}
          </>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
