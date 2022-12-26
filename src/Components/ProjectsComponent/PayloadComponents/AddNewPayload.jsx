import React, { useState } from "react";
import PropTypes from "prop-types";
import { Accordion, Form } from "react-bootstrap";

import Editor from "Components/Editor";
import FormInput from "Components/forms/Inputs/FormInput";
import KeyValuePairsFormField from "Components/forms/KeyValuePairsFormField";
import { ViewComponent } from "Components/CustomComponents";
import { ConvertToSlug, IsValidJson } from "utils";

import ExpOutcomeAccordion from "./components/ExpOutcomeAccordion";
import AddExpOutcomeForm from "./components/AddExpOutcomeForm";
import { AddButton } from "Components/forms/Buttons/index";

const AddNewPayload = (props) => {
  const { cat, data, isLoading, onchange, handleSubmit } = props;

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
    let newResults = [...data.expected_outcome];
    newResults[index] = result;
    onchange("expected_outcome", newResults);
  };

  const onAddNewExpOutcomeEntry = (res) => {
    let newResults = [...data.expected_outcome];
    newResults.push(res);
    onchange("expected_outcome", newResults);
  };

  const onParameterFieldsChange = (result) => {
    onchange("parameters", result);
  };

  return (
    !isLoading &&
    data && (
      <Form onSubmit={handleSubmit} className="w-100">
        <ViewComponent
          title="Add New"
          type="save"
          onSave={handleSubmit}
          onSaveDisabled={data.name.length === 0 || !IsValidJson(data.payload)}
        >
          <FormInput
            label="Name"
            placeholder="Name"
            name="name"
            value={data.name}
            onChange={onFormDataChange}
            disabled={cat === "edit"}
            isRequired
            text={
              data.name.length !== 0 &&
              `Your payload will created as ${ConvertToSlug(data.name)}`
            }
          />
          <FormInput
            name="parameters"
            label="Parameters"
            element={
              <KeyValuePairsFormField
                data={data.parameters}
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
                  onChange={() =>
                    setShowPayloadInJsonFormat(!showPayloadInJsonFormat)
                  }
                />
              </div>
            }
            element={
              <>
                <Editor
                  text={data?.payload}
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
              {data?.expected_outcome?.map((item, index) => {
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
            {showAddExpOutForm || data?.expected_outcome?.length === 0 ? (
              <AddExpOutcomeForm
                onSave={onAddNewExpOutcomeEntry}
                onClose={() => setShowAddExpOutForm(false)}
              />
            ) : (
              <div className="text-center my-1">
                <AddButton
                  size="sm"
                  handleClick={() => setShowAddExpOutForm(true)}
                />
              </div>
            )}
          </div>
        </ViewComponent>
      </Form>
    )
  );
};

export default AddNewPayload;

AddNewPayload.propTypes = {
  cat: PropTypes.oneOf(["add", "edit"]),
  data: PropTypes.object,
  isLoading: PropTypes.bool,
  onchange: PropTypes.func,
  handleSubmit: PropTypes.func,
};
