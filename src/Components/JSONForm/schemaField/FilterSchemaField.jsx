import React from "react";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";

import Input from "Components/forms/Inputs/Input";

const FilterSchemaField = ({ control, errors = {}, ...props }) => {
  const { name, type, component, ...properties } = props || {};
  const error = errors[name];

  switch (type) {
    case "text":
    case "email":
    case "number":
    case "password":
      return (
        <Input
          name={name}
          type={type}
          isInvalid={Boolean(error)}
          errorText={error?.message}
          {...control.register(name)}
          {...properties}
        />
      );

    case "textarea":
      return (
        <Input
          name={name}
          as="textarea"
          type="text"
          isInvalid={Boolean(error)}
          errorText={error?.message}
          {...control.register(name)}
          {...properties}
        />
      );

    case "custom":
      return (
        <Controller
          name={name}
          control={control}
          render={({ field: { value, onChange, onBlur } }) =>
            component(value, onChange, onBlur)
          }
        />
      );

    default:
      return <>{component}</>;
  }
};

FilterSchemaField.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  control: PropTypes.any,
  errors: PropTypes.object,
  component: PropTypes.any,
};

export default FilterSchemaField;
