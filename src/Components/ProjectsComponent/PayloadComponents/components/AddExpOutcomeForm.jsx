import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";

import { DeleteButton, SaveButton } from "Components/forms/Buttons/index";
import FormInput from "Components/forms/Inputs/FormInput";
import ExpectedOutcomeTable from "Components/ProjectsComponent/ExpectedOutcomeTable/index";
import { EXPECTED_OUTCOME_TEMPLATE } from "constants/appConstants";

const AddExpOutcomeForm = ({ onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    expected_outcome: [EXPECTED_OUTCOME_TEMPLATE],
  });

  const handleChange = (name, value) => {
    setFormData((p) => ({
      ...p,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="bg-light border rounded p-3">
      <Form onSubmit={handleSubmit}>
        <FormInput
          label={"Name"}
          name="name"
          value={formData.name}
          onChange={(e) => handleChange(e.target.name, e.target.value)}
          placeholder="Name"
          isRequired
        />
        <FormInput
          label={"Expected Outcome"}
          element={
            <ExpectedOutcomeTable
              data={formData?.expected_outcome}
              onchange={(res) => handleChange("expected_outcome", res)}
            />
          }
        />
        <div className="d-flex justify-content-end">
          <DeleteButton size={"sm"} className="mx-1" handleClick={onClose} />
          <SaveButton
            size={"sm"}
            handleClick={handleSubmit}
            type="button"
            disabled={formData.name.length === 0}
          />
        </div>
      </Form>
    </div>
  );
};

export default AddExpOutcomeForm;

AddExpOutcomeForm.propTypes = {
  onSave: PropTypes.func,
  onClose: PropTypes.func,
};
