import React from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

const FormCheckBox = ({
  type,
  label,
  name,
  value,
  checked,
  onChange,
  text,
  className,
  style,
  disabled,
  ...props
}) => (
  <Form.Group className={className} style={style}>
    <Form.Check
      type={type}
      label={label}
      name={name}
      value={value}
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      {...props}
    />
    {text && <Form.Text className="text-muted">{text}</Form.Text>}
  </Form.Group>
);

FormCheckBox.defaultProps = {
  type: "checkbox",
};

FormCheckBox.propTypes = {
  type: PropTypes.oneOf(["radio", "checkbox"]),
  label: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.any,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  text: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  disabled: PropTypes.bool,
};

export default FormCheckBox;
