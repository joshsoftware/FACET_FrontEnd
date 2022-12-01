import React, { useRef } from "react";
import { Button } from "react-bootstrap";
import { Upload } from "react-bootstrap-icons";
import PropTypes from "prop-types";

const UploadButton = ({
  label,
  onClick,
  allowedFileFormats,
  className,
  ...props
}) => {
  const inputRef = useRef(null);

  const handleFileChange = (event) => {
    const fileObj = event.target.files && event.target.files[0];
    onClick(fileObj);
  };

  // when upload button clicks, it silently hits the hidden input
  // and opens the file dialog for upload
  const handleClick = () => {
    inputRef.current.click();
  };

  return (
    <div>
      <input
        className="d-none"
        accept={allowedFileFormats}
        ref={inputRef}
        type="file"
        onChange={handleFileChange}
      />
      <Button
        onClick={handleClick}
        className={`d-flex align-items-center ${className}`}
        {...props}
      >
        <Upload className="me-2" />
        {label}
      </Button>
    </div>
  );
};

UploadButton.defaultProps = {
  label: "Upload",
  variant: "outline-success",
  allowedFileFormats: ".xlsx",
  size: "sm",
};

UploadButton.propTypes = {
  label: PropTypes.string,
  variant: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  allowedFileFormats: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
};

export default UploadButton;
