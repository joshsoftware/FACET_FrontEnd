import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { buildRoute } from "utils/helper";

const OrgNavItem = ({ data, org }) => {
  const { title, icon: Icon, url } = data;

  // route to navigate when interaction occurs
  const routeToNavigate = buildRoute(url, { org });

  return (
    <Nav.Item>
      <Nav.Link
        as={Link}
        eventKey={routeToNavigate}
        to={routeToNavigate}
        className="px-1 org-nav-tab"
      >
        <span className="py-1 px-2 rounded org-nav-tab-text d-flex align-items-center">
          <Icon className="me-1" /> {title}
        </span>
      </Nav.Link>
    </Nav.Item>
  );
};

OrgNavItem.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  org: PropTypes.string.isRequired,
};

export default OrgNavItem;
