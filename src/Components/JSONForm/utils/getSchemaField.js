import { Controller } from "react-hook-form";

import Input from "Components/forms/Inputs/Input";

const getSchemaField = (name, type, control, errors = {}, props) => {
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
          {...props}
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
          {...props}
        />
      );

    case "custom":
      return (
        <Controller
          name={name}
          control={control}
          render={({ field: { value, onChange, onBlur } }) =>
            props?.component(value, onChange, onBlur)
          }
        />
      );

    default:
      return <>{props?.component}</>;
  }
};

export default getSchemaField;
