import React, { useMemo } from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

import FormInput from "Components/forms/Inputs/FormInput";
import { SaveButton } from "Components/forms/Buttons";

import ConvertToSlug from "utils/ConvertToSlug";

const AddNewOrganizationForm = ({ data, onChange, onSubmit }) => {
  const { orgName, description, contactEmail } = data;

  // helps to make orgName bottom text
  const orgNameInputBottomText = useMemo(
    () =>
      orgName ? (
        <>
          Your organization will be created as <b>{ConvertToSlug(orgName)}</b>
        </>
      ) : (
        "Organization name must be unique."
      ),
    [orgName]
  );

  // check whether the all required fields of form are filled
  const isButtonDisabled = !orgName || !contactEmail;

  return (
    <Form className="my-4 px-4 py-5 rounded bg-white" onSubmit={onSubmit}>
      <FormInput
        label="Organization Name"
        placeholder="Ex. my-sample-org"
        name="orgName"
        value={orgName}
        onChange={onChange}
        text={orgNameInputBottomText}
        isRequired
      />
      <FormInput
        label="Description"
        type="textarea"
        name="description"
        value={description}
        onChange={onChange}
        placeholder="Write here..."
        rows={3}
      />
      <FormInput
        label="Contact Email"
        type="email"
        name="contactEmail"
        value={contactEmail}
        onChange={onChange}
        placeholder="Ex. contact@myorg.com"
        isRequired
      />
      <SaveButton className="w-100" type="submit" disabled={isButtonDisabled} />
    </Form>
  );
};

AddNewOrganizationForm.propTypes = {
  data: PropTypes.shape({
    orgName: PropTypes.string,
    description: PropTypes.string,
    contactEmail: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AddNewOrganizationForm;
