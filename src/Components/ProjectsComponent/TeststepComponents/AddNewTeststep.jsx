import React from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

import FormInput from "Components/forms/Inputs/FormInput";
import FormSelect from "Components/forms/Inputs/FormSelect";
import { ViewComponent } from "Components/CustomComponents";

import { convertToSlug } from "utils";

const AddNewTeststep = ({
  cat,
  data,
  onSubmit,
  onChange,
  methodOptions,
  endpointOptions,
  payloadOptions,
  headerOptions,
}) => {
  const { name, method, endpoint, header, payload } = data;

  // on input field change
  const onFieldChange = (e) => onChange(e.target.name, e.target.value);
  // on select field change
  const onSelectChange = (value, { name }) => onChange(name, value);

  // check whether all form fields are filled or not, if not then disabled the submit button
  const isSaveButtonDisabled =
    !name || !method || !endpoint || !header || !payload;

  const nameInputBottomTextMsg =
    !!name.length && `Your teststep will be created as ${convertToSlug(name)}`;

  return (
    <Form className="w-100" onSubmit={onSubmit}>
      <ViewComponent
        title="Add New"
        type="save"
        onSave={onSubmit}
        isSaveDisabled={isSaveButtonDisabled}
      >
        <FormInput
          label="Name"
          placeholder="Name"
          name="name"
          value={name}
          onChange={onFieldChange}
          text={nameInputBottomTextMsg}
          disabled={cat === "edit"}
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
          isRequired
        />
        <FormSelect
          label="Payload"
          name="payload"
          options={payloadOptions}
          value={payload}
          onChange={onSelectChange}
          isRequired
        />
      </ViewComponent>
    </Form>
  );
};

AddNewTeststep.propTypes = {
  cat: PropTypes.oneOf(["add", "edit"]).isRequired,
  data: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  methodOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  endpointOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  headerOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  payloadOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default AddNewTeststep;
