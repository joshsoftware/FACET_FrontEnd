import React from "react";
import PropTypes from "prop-types";

import FilterSchemaField from "./FilterSchemaField";

const SchemaField = ({ control, errors, properties }) => {
  const { wrapper, wrapperClass, wrapperProps, ...props } = properties || {};
  const Wrapper = wrapper ?? "div";

  return (
    <Wrapper className={wrapperClass} {...wrapperProps}>
      <FilterSchemaField control={control} errors={errors} {...props} />
    </Wrapper>
  );
};

SchemaField.propTypes = {
  control: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  properties: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
    wrapper: PropTypes.object,
    wrapperClass: PropTypes.string,
    wrapperProps: PropTypes.object,
  }).isRequired,
};

export default SchemaField;
