import React from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

import { FormInput } from "Components/forms/Inputs";
import { ViewComponent } from "Components/CustomComponents";

import { ConvertToSlug } from "utils";

const AddNewEnvironment = ({
  cat,
  data,
  isLoading,
  onchange,
  handleSubmit,
}) => {
  const { name, url } = data;

  // check whether all form fields are filled or not, if not then disabled the submit button
  const isSaveButtonDisabled = !name.length || !url.length;

  const nameInputBottomTextMsg =
    !!name.length &&
    `Your environment will be created as ${ConvertToSlug(name)}`;

  return (
    !isLoading &&
    data && (
      <Form onSubmit={handleSubmit} className="w-100">
        <ViewComponent
          title="Add New"
          type="save"
          onSave={handleSubmit}
          onSaveDisabled={isSaveButtonDisabled}
        >
          <FormInput
            label="Name"
            placeholder="Name"
            name="name"
            value={name}
            onChange={onchange}
            isRequired
            disabled={cat === "edit"}
            text={nameInputBottomTextMsg}
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
    )
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
