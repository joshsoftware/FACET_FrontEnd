import React from "react";
import { Spinner } from "react-bootstrap";
import PropTypes from "prop-types";

const Loader = (props) => (
  <div className="text-center">
    <Spinner {...props} />
  </div>
);

Loader.propTypes = {
  animation: PropTypes.oneOf(["border", "grow"]),
  role: PropTypes.string,
  size: PropTypes.string,
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "success",
    "danger",
    "warning",
    "info",
    "light",
    "dark",
  ]),
};

Loader.defaultProps = {
  size: "md",
  variant: "dark",
  animation: "border",
};

export default Loader;
