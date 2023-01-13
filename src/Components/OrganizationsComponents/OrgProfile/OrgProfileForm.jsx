import React from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

import { SaveButton } from "Components/forms/Buttons";
import FormInput from "Components/forms/Inputs/FormInput";

import { isValidEmail } from "utils/helper";

import { DESCRIPTION, EMAIL, ORG_NAME } from "constants/userMessagesConstants";

const OrgProfileForm = ({ data, onChange, onSubmit, isOrgOwner }) => {
  const { name, description, email } = data;

  // check whether all required fields are filled or not
  const isButtonDisabled = !name || !isValidEmail(email);

  return (
    <Form onSubmit={onSubmit}>
      <FormInput
        label="Name"
        type="text"
        name="name"
        value={name}
        placeholder={ORG_NAME}
        isRequired
        disabled
      />
      <FormInput
        label="Description"
        type="textarea"
        name="description"
        value={description}
        onChange={onChange}
        placeholder={DESCRIPTION}
      />
      <FormInput
        label="Contact"
        type="email"
        name="email"
        value={email}
        onChange={onChange}
        placeholder={EMAIL}
        isRequired
      />
      {!!isOrgOwner && (
        <SaveButton
          className="w-100"
          label="Update Profile"
          disabled={isButtonDisabled}
        />
      )}
    </Form>
  );
};

OrgProfileForm.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isOrgOwner: PropTypes.bool,
};

export default OrgProfileForm;
