import React, { forwardRef, memo } from "react";
import RSelect from "react-select";
import PropTypes from "prop-types";

import {
  ERROR_BORDER,
  ERROR_FOCUSED,
  INPUT_BORDER,
  INPUT_FOCUSED,
} from "constants/colors";

const Select = ({ label, isInvalid, errorText, required, ...props }, ref) => {
  const customStyles = {
    control: (base, state) => ({
      ...base,
      borderColor: isInvalid
        ? ERROR_BORDER
        : state.isFocused
        ? INPUT_BORDER
        : base.borderColor,
      boxShadow:
        state.isFocused &&
        `0 0 0 0.25rem ${isInvalid ? ERROR_FOCUSED : INPUT_FOCUSED}`,
      "&:hover": {
        borderColor: isInvalid
          ? ERROR_BORDER
          : state.isFocused
          ? INPUT_BORDER
          : base.borderColor,
      },
    }),
  };

  return (
    <div className="mb-3">
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
