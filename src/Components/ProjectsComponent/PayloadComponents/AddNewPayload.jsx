import React, { useState } from "react";
import { Accordion, Form } from "react-bootstrap";
import PropTypes from "prop-types";

import { AddButton } from "Components/forms/Buttons";
import AddExpOutcomeForm from "./components/AddExpOutcomeForm";
import Editor from "Components/Editor";
import ExpOutcomeAccordion from "./components/ExpOutcomeAccordion";
import FormInput from "Components/forms/Inputs/FormInput";
import KeyValuePairsFormField from "Components/forms/KeyValuePairsFormField";
import Loader from "Components/Loader";
import { ViewComponent } from "Components/CustomComponents";

import { convertToSlug, isValidJson } from "utils";

import { NAME_FIELD_MAX_LENGTH } from "constants/appConstants";

const AddNewPayload = ({ cat, data, isLoading, onchange, handleSubmit }) => {
  const { name, parameters, payload, expected_outcome: expectedOutcome } = data;

  const [showPayloadInJsonFormat, setShowPayloadInJsonFormat] = useState(false);
  const [showAddExpOutForm, setShowAddExpOutForm] = useState(false);

  const onFormDataChange = (e) => {
    onchange(e.target.name, e.target.value);
  };

  const onPayloadFieldsChange = (result) => {
    if (JSON.parse(result)) {
      onchange("payload", result);
    }
  };

  const onExpectedOutcomeFieldsChange = (index, result) => {
    // update according to new functionalities
    let newResults = [...expectedOutcome];
    newResults[index] = result;
    onchange("expected_outcome", newResults);
  };

  const onAddNewExpOutcomeEntry = (res) => {
    let newResults = [...expectedOutcome];
    newResults.push(res);
    onchange("expected_outcome", newResults);
  };

  const onParameterFieldsChange = (result) => {
    onchange("parameters", result);
  };

  const toggleExpOutcomeForm = () => setShowAddExpOutForm(!showAddExpOutForm);

  const toggleJsonFormInEditor = () =>
    setShowPayloadInJsonFormat(!showPayloadInJsonFormat);

  const isEditForm = cat === "edit";
  // check whether all required form fields are filled or not, if not then disabled the submit button
  const isSaveButtonDisabled =
    isLoading ||
    !name.length ||
    !isValidJson(payload) ||
    !expectedOutcome.length;

  const nameInputBottomTextMsg =
    !!name.length && `Your payload will be created as ${convertToSlug(name)}`;

  const isExpectedOutcomeForm =
    showAddExpOutForm || expectedOutcome?.length === 0;

  const viewComponentTitle = isEditForm ? name : "Add New Payload";

  const editorMode = showPayloadInJsonFormat ? "code" : "tree";

  return (
    <Form onSubmit={handleSubmit} className="w-100">
      <ViewComponent
        title={viewComponentTitle}
        type="save"
        onSave={handleSubmit}
        isSaveDisabled={isSaveButtonDisabled}
      >
        {isLoading ? (
          <Loader />
        ) : (
          <>
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
                setData={onParameterFieldsChange}
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
              {isExpectedOutcomeForm ? (
                <AddExpOutcomeForm
                  onSave={onAddNewExpOutcomeEntry}
                  onClose={toggleExpOutcomeForm}
                />
              ) : (
                <div className="text-center my-1">
                  <AddButton size="sm" handleClick={toggleExpOutcomeForm} />
                </div>
              )}
            </div>
          </>
        )}
      </ViewComponent>
    </Form>
  );
};

AddNewPayload.propTypes = {
  cat: PropTypes.oneOf(["add", "edit"]).isRequired,
  data: PropTypes.shape({
    name: PropTypes.string,
    parameters: PropTypes.object,
    payload: PropTypes.object,
    expected_outcome: PropTypes.array,
  }).isRequired,
  isLoading: PropTypes.bool,
  onchange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default AddNewPayload;
