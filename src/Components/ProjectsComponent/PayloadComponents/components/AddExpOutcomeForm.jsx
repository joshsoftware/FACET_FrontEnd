import React, { useState } from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

import { DeleteButton, SaveButton } from "Components/forms/Buttons/index";
import FormInput from "Components/forms/Inputs/FormInput";
import ExpectedOutcomeTable from "Components/ProjectsComponent/ExpectedOutcomeTable/index";

import { convertToSlug } from "utils";

import { EXPECTED_OUTCOME_TEMPLATE } from "constants/appConstants";

const AddExpOutcomeForm = ({ onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    expectedOutcome: [EXPECTED_OUTCOME_TEMPLATE],
  });

  const nameInputBottomTextMsg =
    !!formData.name.length &&
    `Your endpoint will be created as ${convertToSlug(formData.name)}`;

  const handleChange = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedFormData = {
      name: formData.name,
      expected_outcome: formData.expectedOutcome,
    };
    onSave(updatedFormData);
    onClose();
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
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          placeholder="Name"
          text={nameInputBottomTextMsg}
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
          <DeleteButton size={"sm"} className="mx-1" handleClick={onClose} />
          <SaveButton
            size={"sm"}
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
};

export default AddExpOutcomeForm;
