import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";

const FormCheckBox = (props) => {
  const { label, name, value, handlechange, text, className, style, disabled } =
    props;

  return (
    <Form.Group className={className} style={style}>
      <Form.Check
        type="checkbox"
        label={label}
        name={name}
        checked={value}
        onChange={handlechange}
        disabled={disabled}
      />
      {text && <Form.Text className="text-muted">{text}</Form.Text>}
    </Form.Group>
  );
};

export default FormCheckBox;

FormCheckBox.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.any,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handlechange: PropTypes.func,
  text: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  disabled: PropTypes.bool,
};
