import React from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

import { FormInput } from "Components/forms/Inputs";
import { ViewComponent } from "Components/CustomComponents";

import { convertToSlug } from "utils";

import { NAME_FIELD_MAX_LENGTH } from "constants/appConstants";

const AddNewEnvironment = ({
  cat,
  data,
  isLoading,
  onchange,
  handleSubmit,
}) => {
  const { name, url } = data;

  const isEditForm = cat === "edit";

  // check whether all form fields are filled or not, if not then disabled the submit button
  const isSaveButtonDisabled = isLoading || !name.length || !url.length;

  const nameInputBottomTextMsg =
    !!name.length &&
    `Your environment will be created as ${convertToSlug(name)}`;

  const viewComponentTitle = isEditForm ? name : "Add New Environment";

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
          disabled={isEditForm}
          text={nameInputBottomTextMsg}
          maxLength={NAME_FIELD_MAX_LENGTH}
          isRequired
        />
        <FormInput
          label="URL"
          placeholder="Enter URL"
          name="url"
          value={url}
          onChange={onchange}
          type="url"
          isRequired
        />
      </ViewComponent>
    </Form>
  );
};

AddNewEnvironment.propTypes = {
  cat: PropTypes.oneOf(["add", "edit"]).isRequired,
  data: PropTypes.shape({ name: PropTypes.string, url: PropTypes.string })
    .isRequired,
  isLoading: PropTypes.bool,
  onchange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

AddNewEnvironment.defaultProp = {
  data: {
    name: "",
    url: "",
  },
};

export default AddNewEnvironment;
