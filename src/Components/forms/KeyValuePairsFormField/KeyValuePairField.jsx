import React from "react";
import { Button } from "react-bootstrap";
import { Trash } from "react-bootstrap-icons";
import PropTypes from "prop-types";

import { FormInput } from "Components/forms/Inputs";

import { hasWhiteSpace } from "utils";

import "./style.css";

const KeyValuePairField = ({
  index,
  keyField,
  valueField,
  onChange,
  onRemoveField,
}) => {
  // handles onChange form event by destructuring name and value from event.target
  const handleChangeField = ({ target: { name, value } }) => {
    onChange(name, value, index);
  };

  const onDeleteField = () => onRemoveField(index);

  return (
    <div className=" d-flex justify-content-between align-items-center">
      <FormInput
        name="key"
        onChange={handleChangeField}
        value={keyField}
        placeholder="Key"
        className="key-input"
        error={hasWhiteSpace(keyField)}
        errorMessage="No space allowed for the key field."
      />
      <FormInput
        name="value"
        onChange={handleChangeField}
        value={valueField}
        placeholder="Value"
        className="key-input"
      />
      <Button
        variant="danger"
        className="m-0 mb-3 py-2 px-1 d-flex justify-content-between align-items-center"
        onClick={onDeleteField}
      >
        <Trash />
      </Button>
    </div>
  );
};

KeyValuePairField.propTypes = {
  index: PropTypes.number.isRequired,
  keyField: PropTypes.string.isRequired,
  valueField: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onRemoveField: PropTypes.func.isRequired,
};

export default KeyValuePairField;
