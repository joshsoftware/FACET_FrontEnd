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

import { ConvertToSlug, IsValidJson } from "utils";

const AddNewPayload = ({ cat, data, isLoading, onchange, handleSubmit }) => {
  const { name, parameters, payload, expected_outcome: expectedOutcome } = data;

  const [showPayloadInJsonFormat, setShowPayloadInJsonFormat] = useState(false);
  const [showAddExpOutForm, setShowAddExpOutForm] = useState(false);

  const onFormDataChange = (e) => {
    onchange(e.target.name, e.target.value);
  };

  const onPayloadFieldsChange = (result) => {
    onchange("payload", result);
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

  // check whether all required form fields are filled or not, if not then disabled the submit button
  const isSaveButtonDisabled =
    !name.length || !IsValidJson(payload) || !expectedOutcome.length;

  const nameInputBottomTextMsg =
    !!name.length && `Your payload will be created as ${ConvertToSlug(name)}`;

  const isExpectedOutcomeForm =
    showAddExpOutForm || expectedOutcome?.length === 0;

  return (
    !isLoading &&
    data && (
      <Form onSubmit={handleSubmit} className="w-100">
        <ViewComponent
          title="Add New"
          type="save"
          onSave={handleSubmit}
          onSaveDisabled={isSaveButtonDisabled}
        >
          <FormInput
            label="Name"
            placeholder="Name"
            name="name"
            value={name}
            onChange={onFormDataChange}
            disabled={cat === "edit"}
            isRequired
            text={nameInputBottomTextMsg}
          />
          <FormInput
            name="parameters"
            label="Parameters"
            element={
              <KeyValuePairsFormField
                data={parameters}
                setData={onParameterFieldsChange}
              />
            }
          />
          <FormInput
            label={
              <div className="d-flex justify-content-between align-items-center">
                <span>Payload</span>
                <Form.Check
                  type="switch"
                  label="Json Format"
                  value={showPayloadInJsonFormat}
                  onChange={toggleJsonFormInEditor}
                />
              </div>
            }
            element={
              <>
                <Editor
                  text={payload}
                  mode={showPayloadInJsonFormat ? "code" : "tree"}
                  indentation={4}
                  onChangeText={onPayloadFieldsChange}
                />
              </>
            }
          />
          <div>
            <label>
              Expected Outcomes<span className="text-danger">*</span>
            </label>
            <Accordion>
              {expectedOutcome?.map((item, index) => {
                return (
                  <ExpOutcomeAccordion
                    data={item}
                    key={index}
                    eventKey={index}
                    onChange={(res) =>
                      onExpectedOutcomeFieldsChange(index, res)
                    }
                  />
                );
              })}
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
        </ViewComponent>
      </Form>
    )
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
