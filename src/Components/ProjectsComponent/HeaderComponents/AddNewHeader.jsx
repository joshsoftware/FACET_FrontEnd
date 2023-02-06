import React from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

import { FormInput } from "Components/forms/Inputs";
import KeyValuePairsFormField from "Components/forms/KeyValuePairsFormField";
import { ViewComponent } from "Components/CustomComponents";

import { ConvertToSlug } from "utils";

const AddNewHeader = ({
  cat,
  isLoading,
  data,
  onchange,
  onKeyValuePairsChange,
  handleSubmit,
}) => {
  const { name, header } = data;

  // check whether all form fields are filled or not, if not then disabled the submit button
  const isSaveButtonDisabled = !name.length || !Object.entries(header).length;

  const nameInputBottomTextMsg =
    !!name.length && `Your header will be created as ${ConvertToSlug(name)}`;

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
            label="Header"
            element={
              <KeyValuePairsFormField
                data={header}
                setData={onKeyValuePairsChange}
              />
            }
            isRequired
          />
        </ViewComponent>
      </Form>
    )
  );
};

AddNewHeader.propTypes = {
  cat: PropTypes.oneOf(["add", "edit"]).isRequired,
  isLoading: PropTypes.bool,
  data: PropTypes.shape({
    name: PropTypes.string,
    header: PropTypes.object,
  }).isRequired,
  onchange: PropTypes.func.isRequired,
  onKeyValuePairsChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

AddNewHeader.defaultProp = {
  data: {
    name: "",
    header: {},
  },
};

export default AddNewHeader;
