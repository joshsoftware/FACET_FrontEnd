import React, { forwardRef, memo } from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

const Input = (
  { label, name, isInvalid, required, errorText, helperText, ...props },
  ref
) => (
  <Form.Group className="mb-3">
    {label && (
      <Form.Label htmlFor={name}>
        {label}
        {required && <span className="text-danger">*</span>}
      </Form.Label>
    )}
    <Form.Control name={name} ref={ref} isInvalid={isInvalid} {...props} />
    <Form.Control.Feedback type="invalid">{errorText}</Form.Control.Feedback>
    {!isInvalid && <Form.Text>{helperText}</Form.Text>}
  </Form.Group>
);

Input.propTypes = {
  label: PropTypes.any,
  required: PropTypes.bool,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  className: PropTypes.string,
  helperText: PropTypes.string,
  errorText: PropTypes.string,
  isInvalid: PropTypes.bool,
};

export default memo(forwardRef(Input));
