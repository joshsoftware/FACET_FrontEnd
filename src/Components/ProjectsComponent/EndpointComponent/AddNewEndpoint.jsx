import React from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

import { FormInput } from "Components/forms/Inputs";
import { ViewComponent } from "Components/CustomComponents";

import { convertToSlug } from "utils";

import { NAME_FIELD_MAX_LENGTH } from "constants/appConstants";

const AddNewEndpoint = ({ cat, data, isLoading, onchange, handleSubmit }) => {
  const { name, endpoint } = data;

  const isEditForm = cat === "edit";

  // check whether all form fields are filled or not, if not then disabled the submit button
  const isSaveButtonDisabled = isLoading || !name.length || !endpoint.length;

  const nameInputBottomTextMsg =
    !!name.length && `Your endpoint will be created as ${convertToSlug(name)}`;

  const viewComponentTitle = isEditForm ? name : "Add New Endpoint";

  return (
    <Form onSubmit={handleSubmit} className="w-100">
      <ViewComponent
        title={viewComponentTitle}
        type="save"
        onSave={handleSubmit}
        isLoading={isLoading}
        isSaveDisabled={isSaveButtonDisabled}
      >
        <FormInput
          label="Name"
          placeholder="Name"
          name="name"
          value={name}
          onChange={onchange}
          maxLength={NAME_FIELD_MAX_LENGTH}
          text={nameInputBottomTextMsg}
          disabled={isEditForm}
          isRequired
        />
        <FormInput
          label="Endpoint"
          placeholder="Endpoint"
          name="endpoint"
          value={endpoint}
          onChange={onchange}
          isRequired
        />
      </ViewComponent>
    </Form>
  );
};

AddNewEndpoint.propTypes = {
  cat: PropTypes.oneOf(["add", "edit"]).isRequired,
  data: PropTypes.shape({ name: PropTypes.string, endpoint: PropTypes.string })
    .isRequired,
  isLoading: PropTypes.bool,
  onchange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

AddNewEndpoint.defaultProp = {
  data: {
    name: "",
    endpoint: "",
  },
};

export default AddNewEndpoint;
