import React, { forwardRef, memo, useState } from "react";
import classNames from "classnames";
import { Form, InputGroup } from "react-bootstrap";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import PropTypes from "prop-types";

const PasswordInput = (
  { label, name, type, isInvalid, required, errorText, helperText, ...props },
  ref
) => {
  const [isShow, setIsShow] = useState(type !== "password");

  const toggleShow = () => setIsShow((show) => !show);

  const inputType = isShow ? "text" : "password";

  const rightIconClasses = classNames("bg-white", {
    "text-danger border-danger": isInvalid,
  });

  const formTextClasses = classNames({ "text-danger": isInvalid });

  return (
    <Form.Group className="mb-3">
      {label && (
        <Form.Label htmlFor={name}>
          {label}
          {required && <span className="text-danger">*</span>}
        </Form.Label>
      )}
      <InputGroup>
        <Form.Control
          name={name}
          type={inputType}
          ref={ref}
          isInvalid={isInvalid}
          {...props}
          className="border-end-0"
        />
        <InputGroup.Text onClick={toggleShow} className={rightIconClasses}>
          {isShow ? <EyeSlashFill /> : <EyeFill />}
        </InputGroup.Text>
      </InputGroup>
      <Form.Text className={formTextClasses}>
        {errorText ?? helperText}
      </Form.Text>
    </Form.Group>
  );
};

PasswordInput.propTypes = {
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

export default memo(forwardRef(PasswordInput));
