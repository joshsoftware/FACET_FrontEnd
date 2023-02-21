import React from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

import { FormInput } from "Components/forms/Inputs";
import { ViewComponent } from "Components/CustomComponents";

import { convertToSlug } from "utils";

const AddNewEndpoint = ({ cat, data, isLoading, onchange, handleSubmit }) => {
  const { name, endpoint } = data;

  // check whether all form fields are filled or not, if not then disabled the submit button
  const isSaveButtonDisabled = !name.length || !endpoint.length;

  const nameInputBottomTextMsg =
    !!name.length && `Your endpoint will be created as ${convertToSlug(name)}`;

  return (
    !isLoading &&
    data && (
      <Form onSubmit={handleSubmit} className="w-100">
        <ViewComponent
          title="Add New"
          type="save"
          onSave={handleSubmit}
          isSaveDisabled={isSaveButtonDisabled}
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
            label="Endpoint"
            placeholder="Endpoint"
            name="endpoint"
            value={endpoint}
            onChange={onchange}
            isRequired
          />
        </ViewComponent>
      </Form>
    )
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
