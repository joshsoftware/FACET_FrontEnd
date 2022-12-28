import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AddAdminModal from "Components/DashboardComponent/SuperAdmin/AddAdminModal";

import { addAdminsRequest } from "store/SuperAdmin/actions";
import { getUsersRequest, signOutRequest } from "store/User/actions";

import logo from "assets/images/logo.png";

const mapState = ({ user }) => ({
  isLoggedIn: user.isLoggedIn,
  currentUser: user.currentUser,
  usersOptions: user.users.map((user) => ({
    label: user.name,
    value: user.id,
  })),
  isUsersLoading: user.isLoading,
});

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    isLoggedIn,
    currentUser: { is_super_admin: isSuperAdmin, name: userName },
    usersOptions,
    isUsersLoading,
  } = useSelector(mapState);

  const [showAddAdminModal, setShowAddAdminModal] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);

  // get list of users whose role is not admin
  useEffect(() => {
    if (showAddAdminModal && isLoggedIn && isSuperAdmin) {
      dispatch(getUsersRequest({ exclude: "admins" }));
    }
  }, [isLoggedIn, isSuperAdmin, showAddAdminModal]);

  // toggle add admin modal
  const handleToggle = () => {
    setShowAddAdminModal(!showAddAdminModal);
    setSelectedUsers([]);
  };

  // handle user logout action
  const handleLogout = () => dispatch(signOutRequest());

  // sets selected users
  const handleChangeAdminFormData = (value) => {
    console.log(value);
    setSelectedUsers(value);
  };

  // helps to submit admin form data and close the modal
  const handleSubmitAdminFormData = () => {
    dispatch(addAdminsRequest({ admin: selectedUsers.map((e) => e.value) }));
    handleToggle();
  };

  return (
    <Navbar bg="dark" sticky="top" variant="dark" expand="lg">
      {isLoggedIn && isSuperAdmin && (
        <AddAdminModal
          show={showAddAdminModal}
          data={selectedUsers}
          usersOptions={usersOptions}
          onChange={handleChangeAdminFormData}
          onClose={handleToggle}
          onSubmit={handleSubmitAdminFormData}
          isUsersLoading={isUsersLoading}
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
