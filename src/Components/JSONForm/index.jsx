import React, { memo } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";

import SchemaField from "./schemaField";

const JSONForm = ({ schema, onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {schema?.map((schemaItem, index) => (
        <SchemaField
          key={index}
          control={control}
          errors={errors}
          properties={schemaItem}
        />
      ))}
    </Form>
  );
};

JSONForm.propTypes = {
  schema: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default memo(JSONForm);
