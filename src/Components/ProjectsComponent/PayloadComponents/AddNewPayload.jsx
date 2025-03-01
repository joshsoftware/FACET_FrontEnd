import React, { useState } from "react";
import { Accordion, Form } from "react-bootstrap";
import PropTypes from "prop-types";

import { AddButton } from "Components/forms/Buttons";
import AddExpOutcomeForm from "./components/AddExpOutcomeForm";
import Editor from "Components/Editor";
import ExpOutcomeAccordion from "./components/ExpOutcomeAccordion";
import FormInput from "Components/forms/Inputs/FormInput";
import KeyValuePairsFormField from "Components/forms/KeyValuePairsFormField";
import { ViewComponent } from "Components/CustomComponents";

import { convertToSlug, isValidJson } from "utils";
import { toastMessage } from "utils/toastMessage";

import { EXPECTED_OUTCOME } from "constants/userMessagesConstants";
import { NAME_FIELD_MAX_LENGTH } from "constants/appConstants";

const AddNewPayload = ({ cat, data, isLoading, onChange, handleSubmit }) => {
  const { name, parameters, payload, expectedOutcome } = data;

  const isEditForm = cat === "edit";

  const [showPayloadInJsonFormat, setShowPayloadInJsonFormat] = useState(false);
  const [isShowAddExpOutForm, setIsShowAddExpOutForm] = useState(!isEditForm);

  const onFormDataChange = (e) => {
    onChange(e.target.name, e.target.value);
  };

  const onPayloadFieldsChange = (result) => {
    if (JSON.parse(result)) {
      onChange("payload", result);
    }
  };

  const onExpectedOutcomeFieldsChange = (index, result) => {
    // update according to new functionalities
    let newResults = [...expectedOutcome];
    newResults[index] = result;
    onChange("expectedOutcome", newResults);
  };

  // handles save new expected outcome
  // if name of incoming fields in already present into the expectedOutcomes
  // then show error and do not save the new entry
  const onAddNewExpOutcomeEntry = (res) => {
    const isExpectedOutcomeExist = expectedOutcome?.find(
      (expOutcome) => expOutcome.name === convertToSlug(res?.name)
    );
    if (isExpectedOutcomeExist) {
      toastMessage(EXPECTED_OUTCOME.NAME_ALREADY_EXIST, "error");
      return;
    }
    let newResults = [...expectedOutcome];
    newResults.push(res);
    onChange("expectedOutcome", newResults);
    toggleExpOutcomeForm();
  };

  const onParameterFieldsChange = (result) => {
    onChange("parameters", result);
  };

  const toggleExpOutcomeForm = () =>
    setIsShowAddExpOutForm((prevState) => !prevState);

  const toggleJsonFormInEditor = () =>
    setShowPayloadInJsonFormat(!showPayloadInJsonFormat);

  // check whether all required form fields are filled or not, if not then disabled the submit button
  const isSaveButtonDisabled =
    isLoading ||
    !name.length ||
    !isValidJson(payload) ||
    !expectedOutcome.length;

  const nameInputBottomTextMsg =
    !!name.length && `Your payload will be created as ${convertToSlug(name)}`;

  const viewComponentTitle = isEditForm ? name : "Add New Payload";

  const editorMode = showPayloadInJsonFormat ? "code" : "tree";

  return (
    <Form onSubmit={handleSubmit} className="w-100">
      <ViewComponent
        title={viewComponentTitle}
        type="save"
        onSave={handleSubmit}
        isLoading={isLoading}
        isSaveDisabled={isSaveButtonDisabled}
      >
        <FormInput
          label="Name"
          placeholder="Name"
          name="name"
          value={name}
          onChange={onFormDataChange}
          disabled={isEditForm}
          maxLength={NAME_FIELD_MAX_LENGTH}
          text={nameInputBottomTextMsg}
          isRequired
        />
        <div className="mb-2">
          <label className="mb-2">Parameters</label>
          <KeyValuePairsFormField
            data={parameters}
            onChange={onParameterFieldsChange}
          />
        </div>
        <div className="mb-3">
          <label className="d-flex justify-content-between align-items-center mb-2">
            <span>Payload</span>
            <Form.Check
              type="switch"
              label="Json Format"
              value={showPayloadInJsonFormat}
              onChange={toggleJsonFormInEditor}
            />
          </label>
          <Editor
            text={payload}
            mode={editorMode}
            indentation={4}
            onChangeText={onPayloadFieldsChange}
          />
        </div>
        <div>
          <label>
            Expected Outcomes<span className="text-danger">*</span>
          </label>
          <Accordion>
            {expectedOutcome?.map((item, index) => (
              <ExpOutcomeAccordion
                data={item}
                key={index}
                eventKey={index}
                onChange={onExpectedOutcomeFieldsChange}
              />
            ))}
          </Accordion>
          {isShowAddExpOutForm ? (
            <AddExpOutcomeForm
              onSave={onAddNewExpOutcomeEntry}
              onClose={toggleExpOutcomeForm}
              isDisabledDeleteButton={!expectedOutcome?.length}
            />
          ) : (
            <div className="text-center my-1">
              <AddButton size="sm" handleClick={toggleExpOutcomeForm} />
            </div>
          )}
        </div>
      </ViewComponent>
    </Form>
  );
};

AddNewPayload.propTypes = {
  cat: PropTypes.oneOf(["add", "edit"]).isRequired,
  data: PropTypes.shape({
    name: PropTypes.string,
    parameters: PropTypes.arrayOf(
      PropTypes.shape({ key: PropTypes.string, value: PropTypes.string })
    ),
    payload: PropTypes.object,
    expectedOutcome: PropTypes.array,
  }).isRequired,
  isLoading: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default AddNewPayload;
