import React, { useEffect, useState } from "react";
import { Container, Dropdown, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AddAdminModal from "Components/DashboardComponent/SuperAdmin/AddAdminModal";

import { addAdminsRequest } from "store/SuperAdmin/actions";
import { convertRolesToStr } from "utils/organizationHelper";
import { getFilteredOrgUsersRequest } from "store/Organizations/OrgMembers/actions";
import { signOutRequest } from "store/User/actions";

import {
  DASHBOARD_ROUTE,
  ORG_MEMBERS_ROUTE,
  ORG_PROFILE_ROUTE,
  USER_PROFILE_ROUTE,
} from "constants/routeConstants";
import { ORG_ROLES } from "constants/roleConstants";

import logo from "assets/images/logo.png";

const mapState = ({ user, orgMembers }) => ({
  isLoggedIn: user.isLoggedIn,
  currentUser: user.currentUser,
  isOrgOwner: user.isOrgOwner,
  usersOptions: orgMembers.filteredUsers?.map((user) => ({
    label: user.name,
    value: user.id,
  })),
  isUsersLoading: user.isLoading,
  isPersonalAccount: user.isPersonalAccount,
});

const Header = () => {
  const dispatch = useDispatch();

  const {
    isLoggedIn,
    currentUser: { name: userName, is_admin: isProjectAdmin },
    isOrgOwner,
    usersOptions,
    isUsersLoading,
    isPersonalAccount,
  } = useSelector(mapState);

  const [showAddAdminModal, setShowAddAdminModal] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);

  // get list of users whose role is not admin
  useEffect(() => {
    if (showAddAdminModal && isLoggedIn && isOrgOwner) {
      dispatch(getFilteredOrgUsersRequest({ exclude: "admins" }));
    }
  }, [isLoggedIn, isOrgOwner, showAddAdminModal]);

  // toggle add admin modal
  const handleToggle = () => {
    setShowAddAdminModal(!showAddAdminModal);
    setSelectedUsers([]);
  };

  // handle user logout action
  const handleLogout = () => dispatch(signOutRequest());

  // sets selected users
  const handleChangeAdminFormData = (value) => {
    setSelectedUsers(value);
  };

  // helps to submit admin form data and close the modal
  const handleSubmitAdminFormData = () => {
    dispatch(addAdminsRequest({ admin: selectedUsers.map((e) => e.value) }));
    handleToggle();
  };

  // get role strings of user
  const role = convertRolesToStr(isOrgOwner, isProjectAdmin);

  // check whether role is visible or not to user, visible only if
  // account_type is organization and user is not the normal member
  const isShowRole = !isPersonalAccount && role !== ORG_ROLES.MEMBER;

  return (
    <Navbar bg="dark" sticky="top" variant="dark" expand="lg">
      {isLoggedIn && isOrgOwner && (
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
          <Link to={DASHBOARD_ROUTE}>
            <img src={logo} width={100} alt="Facet" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="facet-navbar-nav" />
        <Navbar.Collapse id="facet-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to={DASHBOARD_ROUTE}>
              Home
            </Nav.Link>
            {isLoggedIn && isOrgOwner && (
              <Nav.Link onClick={handleToggle}>Add Admin</Nav.Link>
            )}
          </Nav>
          {isLoggedIn && (
            <Dropdown>
              <Dropdown.Toggle
                as={Link}
                to="#"
                className="text-light text-decoration-none d-flex align-items-center"
              >
                <div className="pe-2 d-flex flex-column align-items-end text-light">
                  <div>{userName}</div>
                  {isShowRole && <small>{role}</small>}
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu align="end">
                <Dropdown.Item as={Link} to={USER_PROFILE_ROUTE}>
                  My Profile
                </Dropdown.Item>
                {!isPersonalAccount && (
                  <>
                    <Dropdown.Item as={Link} to={ORG_PROFILE_ROUTE}>
                      My Organization
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to={ORG_MEMBERS_ROUTE}>
                      Members
                    </Dropdown.Item>
                  </>
                )}
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
