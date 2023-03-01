import React from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

import KeyValuePairField from "./KeyValuePairField";

const KeyValuePairsFormField = ({ data, onChange }) => {
  const handleChange = (name, value, index) => {
    const values = [...data];
    values[index][name] = value;
    onChange(values);
  };

  const onAddField = () => {
    onChange([...data, { key: "", value: "" }]);
  };

  const onRemoveField = (index) => {
    const values = data?.filter((_, currentIndex) => currentIndex !== index);
    onChange(values);
  };

  return (
    <div>
      {data?.map(({ key, value }, index) => (
        <KeyValuePairField
          key={index}
          index={index}
          keyField={key}
          valueField={value}
          onChange={handleChange}
          onRemoveField={onRemoveField}
        />
      ))}
      <div className="text-center">
        <Button variant="success" onClick={onAddField} size="sm">
          + Add New
        </Button>
      </div>
    </div>
  );
};

KeyValuePairsFormField.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({ key: PropTypes.string, value: PropTypes.string })
  ).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default KeyValuePairsFormField;
