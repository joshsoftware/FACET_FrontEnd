import React from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

import FormInput from "Components/forms/Inputs/FormInput";
import FormSelect from "Components/forms/Inputs/FormSelect";
import { ViewComponent } from "Components/CustomComponents";

import { convertToSlug } from "utils";

import { NAME_FIELD_MAX_LENGTH } from "constants/appConstants";

const AddNewTeststep = ({
  cat,
  data,
  onSubmit,
  onChange,
  isLoading,
  methodOptions,
  endpointOptions,
  payloadOptions,
  headerOptions,
}) => {
  const { name, method, endpoint, header, payload } = data;

  const isEditForm = cat === "edit";

  // on input field change
  const onFieldChange = (e) => onChange(e.target.name, e.target.value);
  // on select field change
  const onSelectChange = (value, { name }) => onChange(name, value);

  // check whether all form fields are filled or not, if not then disabled the submit button
  const isSaveButtonDisabled =
    isLoading || !name || !method || !endpoint || !header || !payload;

  const nameInputBottomTextMsg =
    !!name.length && `Your teststep will be created as ${convertToSlug(name)}`;

  const viewComponentTitle = isEditForm ? name : "Add New Teststep";

  return (
    <Form className="w-100" onSubmit={onSubmit}>
      <ViewComponent
        title={viewComponentTitle}
        type="save"
        onSave={onSubmit}
        isLoading={isLoading}
        isSaveDisabled={isSaveButtonDisabled}
      >
        <FormInput
          label="Name"
          placeholder="Name"
          name="name"
          value={name}
          onChange={onFieldChange}
          text={nameInputBottomTextMsg}
          disabled={isEditForm}
          maxLength={NAME_FIELD_MAX_LENGTH}
          isRequired
        />
        <FormSelect
          label="Method"
          name="method"
          options={methodOptions}
          value={method}
          onChange={onSelectChange}
          isRequired
        />
        <FormSelect
          label="Endpoint"
          name="endpoint"
          options={endpointOptions}
          value={endpoint}
          onChange={onSelectChange}
          isRequired
        />
        <FormSelect
          label="Header"
          name="header"
          options={headerOptions}
          value={header}
          onChange={onSelectChange}
          menuPlacement="top"
          isRequired
        />
        <FormSelect
          label="Payload"
          name="payload"
          options={payloadOptions}
          value={payload}
          onChange={onSelectChange}
          menuPlacement="top"
          isRequired
        />
      </ViewComponent>
    </Form>
  );
};

AddNewTeststep.propTypes = {
  cat: PropTypes.oneOf(["add", "edit"]).isRequired,
  isLoading: PropTypes.bool,
  data: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  methodOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  endpointOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  headerOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  payloadOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default AddNewTeststep;
