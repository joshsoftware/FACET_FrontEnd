import React from "react";
import { Nav } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import classNames from "classnames";
import PropTypes from "prop-types";

import { truncate } from "utils/helper";

const SubComponentNavItem = ({ itemId, name, componentBaseUrl }) => {
  const { id } = useParams();

  const navItemClasses = classNames("sidebar-item", "text-break", {
    active: itemId.toString() === id,
  });

  return (
    <Nav.Item className={navItemClasses} title={name}>
      <Link
        to={`${componentBaseUrl}/${itemId}`}
        className="nav-link sidebar-link"
      >
        {truncate(name, 25)}
      </Link>
    </Nav.Item>
  );
};

SubComponentNavItem.propTypes = {
  itemId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  componentBaseUrl: PropTypes.string.isRequired,
};

export default React.memo(SubComponentNavItem);
