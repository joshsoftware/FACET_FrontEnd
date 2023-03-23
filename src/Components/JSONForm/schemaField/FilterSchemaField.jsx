import React from "react";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";

import Input from "Components/forms/Inputs/Input";
import Check from "Components/forms/Inputs/Check";
import Select from "Components/forms/Inputs/Select";

const FilterSchemaField = ({ control, errors = {}, ...props }) => {
  const { name, type, component, ...properties } = props || {};
  const error = errors[name];

  switch (type) {
    case "text":
    case "email":
    case "date":
    case "time":
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

    case "datetime":
      return (
        <Input
          name={name}
          type="datetime-local"
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

    case "select":
      return (
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Select
              isInvalid={Boolean(error?.value)}
              errorText={error?.value?.message}
              {...field}
              {...properties}
            />
          )}
        />
      );

    case "radio":
      return properties.enum?.map((item, index) => (
        <Check
          key={index}
          type={type}
          value={item}
          label={item}
          isInvalid={Boolean(error)}
          errorText={error?.message}
          {...control.register(name)}
          {...properties}
        />
      ));

    case "checkbox":
    case "switch":
      return (
        <Check
          type={type}
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
