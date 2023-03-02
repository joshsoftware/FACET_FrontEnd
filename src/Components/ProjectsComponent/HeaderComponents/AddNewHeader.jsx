import React from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

import { FormInput } from "Components/forms/Inputs";
import KeyValuePairsFormField from "Components/forms/KeyValuePairsFormField";
import { ViewComponent } from "Components/CustomComponents";

import { convertToSlug } from "utils";

import { NAME_FIELD_MAX_LENGTH } from "constants/appConstants";

const AddNewHeader = ({
  cat,
  isLoading,
  data,
  onChange,
  onKeyValuePairsChange,
  handleSubmit,
}) => {
  const { name, header } = data;

  const isEditForm = cat === "edit";

  // check whether all form fields are filled or not, if not then disabled the submit button
  const isSaveButtonDisabled =
    isLoading || !name.length || !Object.entries(header).length;

  const nameInputBottomTextMsg =
    !!name.length && `Your header will be created as ${convertToSlug(name)}`;

  const viewComponentTitle = isEditForm ? name : "Add New Header";

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
          onChange={onChange}
          disabled={isEditForm}
          maxLength={NAME_FIELD_MAX_LENGTH}
          text={nameInputBottomTextMsg}
          isRequired
        />
        <div>
          <label className="mb-2">
            Header<span className="text-danger">*</span>
          </label>
          <KeyValuePairsFormField
            data={header}
            onChange={onKeyValuePairsChange}
          />
        </div>
      </ViewComponent>
    </Form>
  );
};

AddNewHeader.propTypes = {
  cat: PropTypes.oneOf(["add", "edit"]).isRequired,
  isLoading: PropTypes.bool,
  data: PropTypes.shape({
    name: PropTypes.string,
    header: PropTypes.arrayOf(
      PropTypes.shape({ key: PropTypes.string, value: PropTypes.string })
    ),
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onKeyValuePairsChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

AddNewHeader.defaultProp = {
  data: {
    name: "",
    header: [{ key: "", value: "" }],
  },
};

export default AddNewHeader;
