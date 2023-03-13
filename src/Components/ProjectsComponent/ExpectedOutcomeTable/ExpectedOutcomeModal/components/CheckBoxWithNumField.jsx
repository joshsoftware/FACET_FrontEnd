import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

import { FormCheckBox, FormInput } from "Components/forms/Inputs";

const CheckBoxWithNumField = (props) => {
  const { label, value, name, handlechange } = props;

  const [isChecked, setIsChecked] = useState(false);

  const onchange = (e) => {
    let val = e.target.value;
    if (val === "") {
      val = 0;
    }
    handlechange(e.target.name, val);
  };

  useEffect(() => {
    if (!isChecked) {
      handlechange(name, null);
    } else {
      handlechange(name, 0);
    }
  }, [isChecked]);

  return (
    <>
      <FormCheckBox
        label={label}
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
        className="py-2"
      />
      {isChecked && (
        <FormInput
          type="number"
          name={name}
          value={value}
          onChange={onchange}
        />
      )}
    </>
  );
};

export default CheckBoxWithNumField;

CheckBoxWithNumField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.number,
  name: PropTypes.string,
  handlechange: PropTypes.func,
};
