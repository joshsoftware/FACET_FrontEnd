import React from "react";
import { Card } from "react-bootstrap";
import PropTypes from "prop-types";

const AuthLayout = ({ children }) => {
  return (
    <div className="h-100 d-flex justify-content-center align-items-center">
      <div>
        <h1 className="text-uppercase text-center">Facet</h1>
        <Card className="p-4">{children}</Card>
      </div>
    </div>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
};

export default AuthLayout;
