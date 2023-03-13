import PropTypes from "prop-types";
import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const SubNavItem = ({ item }) => {
  const [showCollapsedItems, setShowCollapsedItems] = useState(false);

  return (
    <Nav.Item className="sidebar-item">
      <Link
        to={item.path}
        className="nav-link sidebar-link"
        onClick={() => {
          item.childrens && setShowCollapsedItems(!showCollapsedItems);
        }}
      >
        {item.icon}
        <span className="sidebar-link-title">{item.name}</span>
      </Link>
      {item.childrens && (
        <div
          className={`collapse ${
            showCollapsedItems && "show"
          } sidebar-collapse`}
        >
          {item.childrens.map((data, index) => {
            return (
              <Link className="nav-link" to={data.path} key={index}>
                {data.name}
              </Link>
            );
          })}
        </div>
      )}
    </Nav.Item>
  );
};

export default SubNavItem;

SubNavItem.propTypes = {
  item: PropTypes.object,
};
