import React from "react";
import { Button } from "react-bootstrap";
import { Download } from "react-bootstrap-icons";
import PropTypes from "prop-types";

const DownloadButton = ({ label, onClick, className, ...props }) => {
  return (
    <Button
      onClick={onClick}
      className={`d-flex align-items-center ${className}`}
      {...props}
    >
      <Download className="me-2" />
      {label}
    </Button>
  );
};

DownloadButton.defaultProps = {
  label: "Download",
  variant: "success",
  size: "sm",
};

DownloadButton.propTypes = {
  label: PropTypes.string,
  variant: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  size: PropTypes.string,
  className: PropTypes.string,
};

export default DownloadButton;
