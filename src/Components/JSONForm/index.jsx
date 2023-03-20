import React, { memo } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";

import SchemaField from "./SchemaField";

import buildYup from "./utils/buildYup";

const JSONForm = ({ schema, onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(buildYup(schema)),
  });

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
