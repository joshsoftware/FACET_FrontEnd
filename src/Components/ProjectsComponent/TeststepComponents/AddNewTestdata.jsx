import React, { useState } from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

import Editor from "Components/Editor";
import ExpectedOutcomeTable from "../ExpectedOutcomeTable";
import FormInput from "Components/forms/Inputs/FormInput";
import FormSelect from "Components/forms/Inputs/FormSelect";
import KeyValuePairsFormField from "Components/forms/KeyValuePairsFormField";
import { ViewComponent } from "Components/CustomComponents";

import { ConvertToSlug } from "utils";

const AddNewTestdata = ({ data, onChange, onSubmit, onClose }) => {
  const {
    isEditForm,
    name,
    parameters,
    payload,
    expectedOutcome,
    selectedExpOutcome,
  } = data;

  // if the form is to the edit testdata then select component is hidden
  // so the expectedOutcomeOptions is not required for that case
  const expectedOutcomeOptions = !isEditForm
    ? expectedOutcome.map((expOutcome) => ({
        label: expOutcome.name,
        value: expOutcome.id,
      }))
    : null;

  // if the request for edit the testdata then directly pass the expectedOutcome as it was selected expected outcome
  // if the request is to create testdata then it filter out selected expected outcome field from list of expected outcomes
  const activeExpectedOutcome = isEditForm
    ? expectedOutcome
    : expectedOutcome?.find((ele) => ele.id === selectedExpOutcome?.value)
        ?.expected_outcome;

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
  // if the form is to edit the testdata then directly store result in expectedOutcome field
  const onExpectedOutcomeFieldsChange = (result) => {
    if (isEditForm) {
      onChange("expectedOutcome", result);
    } else {
      let expOutcome = expectedOutcome;
      expOutcome.find(
        (ele) => ele.id === selectedExpOutcome?.value
      ).expectedOutcome = result;
      onChange("expectedOutcome", expOutcome);
    }
  };

  // bottom info text for name field
  const nameBottomInfoText =
    name && `Your testdata will be created as ${ConvertToSlug(name)}`;

  // check whether if expected outcome table show or not
  const isShowExpOutcomeTable = isEditForm || selectedExpOutcome;

  // view component title
  const viewComponentTitle = isEditForm ? name : "Add New Testdata";

  // check whether the required fields are filled or not
  const isSaveDisabled = !name || (!isEditForm && !selectedExpOutcome);

  return (
    <Form onSubmit={onSubmit} className="w-100">
      <ViewComponent
        type="save"
        onBack={onClose}
        title={viewComponentTitle}
        // TODO: naming convention for onSaveDisabled need to be improved
        onSaveDisabled={isSaveDisabled}
      >
        <FormInput
          label="Name"
          name="name"
          placeholder="Name"
          value={name}
          onChange={handleInputChange}
          isRequired
          text={nameBottomInfoText}
          disabled={isEditForm}
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
        {!isEditForm ? (
          <FormSelect
            label="Select Exp. Outcome"
            options={expectedOutcomeOptions}
            value={selectedExpOutcome}
            name="selectedExpOutcome"
            onChange={onSelectChange}
            isRequired
          />
        ) : (
          <label className="mt-2">
            Expected Outcome<span className="text-danger">*</span>
          </label>
        )}
        {isShowExpOutcomeTable && (
          <ExpectedOutcomeTable
            data={activeExpectedOutcome}
            onchange={onExpectedOutcomeFieldsChange}
          />
        )}
      </ViewComponent>
    </Form>
  );
};

AddNewTestdata.propTypes = {
  data: PropTypes.shape({
    isEditForm: PropTypes.bool,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    parameters: PropTypes.object,
    payload: PropTypes.string,
    expectedOutcome: PropTypes.arrayOf(PropTypes.object),
    selectedExpOutcome: PropTypes.object,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddNewTestdata;
