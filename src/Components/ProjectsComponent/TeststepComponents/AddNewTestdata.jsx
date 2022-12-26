import React, { useState } from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

import { DeleteButton, SaveButton } from "Components/forms/Buttons";
import Editor from "Components/Editor";
import ExpectedOutcomeTable from "../ExpectedOutcomeTable";
import FormInput from "Components/forms/Inputs/FormInput";
import FormSelect from "Components/forms/Inputs/FormSelect";
import KeyValuePairsFormField from "Components/forms/KeyValuePairsFormField";

import { ConvertToSlug } from "utils";

const AddNewTestdata = ({ data, onChange, onSubmit, handleClose }) => {
  const { name, parameters, payload, expectedOutcome, selectedExpOutcome } =
    data;

  const expectedOutcomeOptions = expectedOutcome.map((expOutcome) => ({
    label: expOutcome.name,
    value: expOutcome.id,
  }));

  const activeExpectedOutcome = expectedOutcome?.find(
    (ele) => ele.id === selectedExpOutcome?.value
  )?.expected_outcome;

  const [showPayloadInJsonFormat, setShowPayloadInJsonFormat] = useState(false);

  const togglePayloadFormat = () =>
    setShowPayloadInJsonFormat(!showPayloadInJsonFormat);

  // handle input fields change
  const handleInputChange = (e) => onChange(e.target.name, e.target.value);

  // handle select field change
  const onSelectChange = (value, { name }) => onChange(name, value);

  // handles payload fields change
  const onPayloadFieldsChange = (res) => {
    if (JSON.parse(res)) {
      onChange("payload", res);
    }
  };

  // handles parameters field change
  const onParameterFieldsChange = (result) => onChange("parameters", result);

  // handles expected outcome fields change
  const onExpectedOutcomeFieldsChange = (result) => {
    let expOutcome = expectedOutcome;
    expOutcome.find(
      (ele) => ele.id === selectedExpOutcome?.value
    ).expectedOutcome = result;
    onChange("expectedOutcome", expOutcome);
  };

  // bottom info text for name field
  const nameBottomInfoText =
    name && `Your testdata will be created as ${ConvertToSlug(name)}`;

  return (
    <div className="bg-light border rounded p-3">
      <Form onSubmit={onSubmit}>
        <FormInput
          label="Name"
          name="name"
          placeholder="Name"
          value={name}
          onChange={handleInputChange}
          isRequired
          text={nameBottomInfoText}
        />
        <div className="mb-3">
          <label className="mb-2">Parameters</label>
          <KeyValuePairsFormField
            data={parameters}
            setData={onParameterFieldsChange}
          />
        </div>
        <div className="mb-3">
          <label className="w-100 mb-2">
            <div className="d-flex justify-content-between align-items-center">
              <span>
                Payload <span className="text-danger">*</span>
              </span>
              <Form.Check
                type="switch"
                label="Json Format"
                value={showPayloadInJsonFormat}
                onChange={togglePayloadFormat}
              />
            </div>
          </label>
          <Editor
            text={payload}
            mode={showPayloadInJsonFormat ? "code" : "tree"}
            indentation={4}
            onChangeText={onPayloadFieldsChange}
          />
        </div>
        <FormSelect
          label="Select Exp. Outcome"
          options={expectedOutcomeOptions}
          value={selectedExpOutcome}
          name="selectedExpOutcome"
          onChange={onSelectChange}
          isRequired
        />
        {selectedExpOutcome && (
          <ExpectedOutcomeTable
            data={activeExpectedOutcome}
            onchange={onExpectedOutcomeFieldsChange}
          />
        )}
        <div className="d-flex justify-content-end mt-3">
          <DeleteButton size="sm" className="mx-1" handleClick={handleClose} />
          <SaveButton size="sm" />
        </div>
      </Form>
    </div>
  );
};

AddNewTestdata.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    parameters: PropTypes.object,
    payload: PropTypes.object,
    expectedOutcome: PropTypes.arrayOf(PropTypes.object),
    selectedExpOutcome: PropTypes.object,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default AddNewTestdata;
