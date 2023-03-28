import React, { memo } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";

import SchemaField from "./schemaField";

import buildYup from "./utils/buildYup";

const JSONForm = ({ schema, onSubmit, defaultValues, isLoading }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(buildYup(schema)),
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {schema?.map((schemaItem, index) => (
        <SchemaField
          key={index}
          control={control}
          errors={errors}
          properties={schemaItem}
          isLoading={isLoading}
        />
      ))}
    </Form>
  );
};

JSONForm.propTypes = {
  schema: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSubmit: PropTypes.func.isRequired,
  defaultValues: PropTypes.object,
  isLoading: PropTypes.bool,
};

export default memo(JSONForm);
