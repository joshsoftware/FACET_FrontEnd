import React from "react";
import { Form } from "react-bootstrap";
import Select from "react-select";
import PropTypes from "prop-types";

const FormSelect = ({
  label,
  value,
  onChange,
  text,
  className,
  style,
  isRequired,
  options,
  isMulti,
  placeholder,
  isLoading,
  isDisabled,
  ...props
}) => (
  <>
    <Form.Group className={`${className} mb-3`} style={style}>
      {label && (
        <Form.Label className="w-100">
          {label}
          {isRequired && <span className="text-danger">*</span>}
        </Form.Label>
      )}
      <Select
        options={options}
        onChange={onChange}
        value={value}
        isMulti={isMulti}
        placeholder={placeholder}
        isLoading={isLoading}
        isDisabled={isDisabled}
        maxMenuHeight={172}
        {...props}
      />
      {text && <Form.Text className="text-muted">{text}</Form.Text>}
    </Form.Group>
  </>
);

FormSelect.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  text: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  isRequired: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  isMulti: PropTypes.bool,
  placeholder: PropTypes.string,
  isLoading: PropTypes.bool,
  isDisabled: PropTypes.bool,
};

export default FormSelect;
