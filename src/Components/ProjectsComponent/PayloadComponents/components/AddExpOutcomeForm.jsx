import React, { useState } from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

import { DeleteButton, SaveButton } from "Components/forms/Buttons/index";
import FormInput from "Components/forms/Inputs/FormInput";
import ExpectedOutcomeTable from "Components/ProjectsComponent/ExpectedOutcomeTable/index";

import { convertToSlug } from "utils";

import {
  EXPECTED_OUTCOME_TEMPLATE,
  NAME_FIELD_MAX_LENGTH,
} from "constants/appConstants";

const AddExpOutcomeForm = ({ onSave, onClose, isDisabledDeleteButton }) => {
  const [formData, setFormData] = useState({
    name: "",
    expectedOutcome: [EXPECTED_OUTCOME_TEMPLATE],
  });

  const nameInputBottomTextMsg =
    !!formData.name.length &&
    `Your expected outcome will be created as ${convertToSlug(formData.name)}`;

  const handleChange = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedFormData = {
      name: convertToSlug(formData.name),
      expected_outcome: formData.expectedOutcome,
    };
    onSave(updatedFormData);
  };

  const onInputFieldsChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleChangeExpectedOutcome = (res) =>
    handleChange("expectedOutcome", res);

  return (
    <div className="bg-light border rounded p-3">
      <Form onSubmit={handleSubmit}>
        <FormInput
          label={"Name"}
          name="name"
          value={formData.name}
          onChange={onInputFieldsChange}
          placeholder="Name"
          text={nameInputBottomTextMsg}
          maxLength={NAME_FIELD_MAX_LENGTH}
          isRequired
        />
        <FormInput
          label={"Expected Outcome"}
          element={
            <ExpectedOutcomeTable
              data={formData?.expectedOutcome}
              onchange={handleChangeExpectedOutcome}
            />
          }
        />
        <div className="d-flex justify-content-end">
          <DeleteButton
            size="sm"
            className="mx-1"
            handleClick={onClose}
            disabled={isDisabledDeleteButton}
          />
          <SaveButton
            size="sm"
            handleClick={handleSubmit}
            type="button"
            disabled={!formData.name.length}
          />
        </div>
      </Form>
    </div>
  );
};

AddExpOutcomeForm.propTypes = {
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  isDisabledDeleteButton: PropTypes.bool,
};

export default AddExpOutcomeForm;
