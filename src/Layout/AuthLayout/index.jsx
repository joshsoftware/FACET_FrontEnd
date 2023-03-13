import React from "react";
import { Card } from "react-bootstrap";
import PropTypes from "prop-types";

import "./style.css";

const AuthLayout = ({ children }) => (
  <div className="d-flex justify-content-center align-items-center authLayout">
    <div className="col-md-4 py-5">
      <h1 className="text-uppercase text-center">Facet</h1>
      <Card className="p-4">{children}</Card>
    </div>
  </div>
);

AuthLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};

export default AuthLayout;
