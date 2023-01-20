import React from "react";
import { Container, Image, Nav } from "react-bootstrap";
import {
  BoxArrowRight,
  Buildings,
  BuildingsFill,
  People,
  PeopleFill,
} from "react-bootstrap-icons";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { signOutRequest } from "store/User/actions";

import {
  ADMIN_USERS_ROUTE,
  ADMIN_ORGANIZATIONS_ROUTE,
} from "constants/routeConstants";

import FACET_LOGO from "assets/images/logo.png";

import "./style.css";

const navItems = [
  {
    title: "Organization",
    activeIcon: <BuildingsFill />,
    inactiveIcon: <Buildings />,
    link: ADMIN_ORGANIZATIONS_ROUTE,
  },
  {
    title: "Users",
    activeIcon: <PeopleFill />,
    inactiveIcon: <People />,
    link: ADMIN_USERS_ROUTE,
  },
];

const AdminLayout = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const onSignOut = () => dispatch(signOutRequest());

  return (
    <Container fluid className="h-100 px-0 d-flex flex-row">
      <Nav className="sidenav bg-dark d-flex flex-column justify-content-between">
        <div>
          <div className="w-100 border-secondary border-bottom px-3 mb-3">
            <Image src={FACET_LOGO} className="w-100 py-2 px-4" alt="FACET" />
          </div>
          <div className="px-3">
            {navItems.map(
              ({ title, link, activeIcon, inactiveIcon }, index) => {
                const isActive = location.pathname === link;
                return (
                  <Nav.Item
                    as={Link}
                    key={index}
                    to={link}
                    className={`w-100 px-3 py-2 text-decoration-none rounded text-light my-1 d-flex align-items-center ${
                      isActive ? "bg-secondary" : ""
                    }`}
                  >
                    <span className="pe-3">
                      {isActive ? activeIcon : inactiveIcon}
                    </span>
                    {title}
                  </Nav.Item>
                );
              }
            )}
          </div>
        </div>
        <div className="py-3 border-top border-secondary">
          <Nav.Item
            role="button"
            className="text-danger d-flex align-items-center text-decoration-none px-4"
            onClick={onSignOut}
          >
            <span className="pe-3">Logout</span>
            <BoxArrowRight />
          </Nav.Item>
        </div>
      </Nav>
      {children}
    </Container>
  );
};

AdminLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};

export default AdminLayout;
