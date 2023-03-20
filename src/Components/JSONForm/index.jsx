import React, { memo } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";

import SchemaField from "./SchemaField";

const JSONForm = ({ schema, onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {schema?.map(
        (
          { name, wrapper, wrapperClass, wrapperProps, type, ...properties },
          index
        ) => (
          <SchemaField
            key={index}
            name={name}
            type={type}
            control={control}
            errors={errors}
            wrapper={wrapper}
            wrapperProps={wrapperProps}
            wrapperClass={wrapperClass}
            {...properties}
          />
        )
      )}
    </Form>
  );
};

JSONForm.propTypes = {
  schema: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default memo(JSONForm);
