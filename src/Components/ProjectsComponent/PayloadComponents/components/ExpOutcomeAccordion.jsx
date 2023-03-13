import React, { useState } from "react";
import { Accordion } from "react-bootstrap";
import PropTypes from "prop-types";

import ExpectedOutcomeTable from "Components/ProjectsComponent/ExpectedOutcomeTable/index";
import { SaveButton } from "Components/forms/Buttons";

import { toastMessage } from "utils/toastMessage";

const ExpOutcomeAccordion = ({ data, onChange, eventKey }) => {
  const [formData, setFormData] = useState(data);

  const onChangeExpectedOutcome = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      expected_outcome: value,
    }));
  };

  const onSave = () => {
    onChange(eventKey, formData);
    toastMessage("Expected Outcome Saved Successfully!");
  };

  return (
    <Accordion.Item eventKey={eventKey}>
      <Accordion.Header>{formData?.name}</Accordion.Header>
      <Accordion.Body>
        <div className="mb-3">
          <label className="mb-2">
            Expected Outcome<span className="text-danger">*</span>
          </label>
          <ExpectedOutcomeTable
            data={formData.expected_outcome}
            onchange={onChangeExpectedOutcome}
          />
        </div>
        <div className="d-flex justify-content-end">
          <SaveButton size="sm" handleClick={onSave} type="button" />
        </div>
      </Accordion.Body>
    </Accordion.Item>
  );
};

ExpOutcomeAccordion.propTypes = {
  data: PropTypes.object,
  onChange: PropTypes.func,
  eventKey: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default ExpOutcomeAccordion;
