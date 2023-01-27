import React from "react";
import PropTypes from "prop-types";

import "./style.css";

const Backdrop = ({ children }) => (
  <div className="position-absolute bg-secondary w-100 h-100 d-flex justify-content-center align-items-center bg-opacity-50 rounded backdrop">
    {children}
  </div>
);

Backdrop.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Backdrop;
