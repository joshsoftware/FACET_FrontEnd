import React, { forwardRef, memo } from "react";
import RSelect from "react-select";
import PropTypes from "prop-types";

const Select = ({ label, isInvalid, errorText, required, ...props }, ref) => {
  const customStyles = {
    control: (base) => ({
      ...base,
      borderColor: isInvalid ? "#dc3545" : base.borderColor,
      boxShadow: !!isInvalid,
      "&:hover": {
        borderColor: isInvalid ? "#dc3545" : base.borderColor,
      },
    }),
  };

  return (
    <div>
      <label>
        {label} {required && <span className="text-danger">*</span>}
      </label>
      <RSelect ref={ref} styles={customStyles} {...props} />
      {isInvalid && <small className="text-danger">{errorText}</small>}
    </div>
  );
};

Select.propTypes = {
  label: PropTypes.any,
  isInvalid: PropTypes.bool,
  errorText: PropTypes.string,
  required: PropTypes.bool,
};

export default memo(forwardRef(Select));
