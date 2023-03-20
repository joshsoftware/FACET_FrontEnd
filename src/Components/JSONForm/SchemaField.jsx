import React from "react";
import PropTypes from "prop-types";

import getSchemaField from "./utils/getSchemaField";

const SchemaField = ({
  name,
  type,
  control,
  errors,
  wrapper,
  wrapperClass,
  wrapperProps,
  ...props
}) => {
  const Wrapper = wrapper ?? "div";

  return (
    <Wrapper className={wrapperClass} {...wrapperProps}>
      {getSchemaField(name, type, control, errors, props)}
    </Wrapper>
  );
};

SchemaField.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  control: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  wrapper: PropTypes.object,
  wrapperClass: PropTypes.string,
  wrapperProps: PropTypes.object,
};

export default SchemaField;
