import React, { forwardRef, memo } from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

const Check = ({ type, label, errorText, isInvalid, ...props }, ref) => {
  // Form.Check.Input have only two types radio and checkbox
  // If the type of check is switch then Form.Check.Input requires checkbox type
  const formInputType = type === "radio" ? "radio" : "checkbox";

  return (
    <Form.Check type={type} id={`check-${type}`}>
      <Form.Check.Input
        type={formInputType}
        isInvalid={isInvalid}
        ref={ref}
        {...props}
      />
      <Form.Check.Label>{label}</Form.Check.Label>
      <Form.Control.Feedback type="invalid">{errorText}</Form.Control.Feedback>
    </Form.Check>
  );
};

Check.propTypes = {
  type: PropTypes.oneOf(["radio", "checkbox", "switch"]).isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.any,
  isInvalid: PropTypes.bool,
  errorText: PropTypes.string,
};

export default memo(forwardRef(Check));
