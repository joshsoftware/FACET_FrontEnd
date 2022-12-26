import React from "react";
import { Button, Form, Row } from "react-bootstrap";
import PropTypes from "prop-types";

import FormInput from "Components/forms/Inputs/FormInput";
import FormSelect from "Components/forms/Inputs/FormSelect";
import SetCustomTimeInput from "./components/SetCustomTimeInput";
import { ViewComponent } from "Components/CustomComponents";

const frequecyTypes = [
  "oneTime",
  "daily",
  "weekly",
  "bi-weekly",
  "monthly",
  "custom",
];

const AddNewSchedule = ({ isLoading, data, onChange, onSubmit, options }) => {
  const {
    testcase,
    environment,
    frequencyType,
    frequencyValue,
    startDateTime,
    endDateTime,
  } = data;

  const { testcases: testcasesOptions, environments: environmentsOptions } =
    options;

  // on change input
  const onInputChange = (e) => onChange(e.target.name, e.target.value);

  // on FormSelect Changes
  const onSelectChange = (value, { name }) => onChange(name, value);

  // it checks whether all entries of form filled or not, if not it will disable the save button
  // testcase and evironment is object if selected otherwise it will be null 
  const isSaveButtonDisabled =
    !testcase ||
    !environment ||
    !Object.keys(testcase)?.length ||
    !Object.keys(environment)?.length ||
    !frequencyType ||
    !startDateTime;

  return (
    !isLoading && (
      <Form onSubmit={onSubmit}>
        <ViewComponent
          title="Schedule New Testcase"
          type="save"
          onSave={onSubmit}
          onSaveDisabled={isSaveButtonDisabled}
        >
          <Row>
            <FormSelect
              label="Testcase"
              options={testcasesOptions}
              onChange={onSelectChange}
              className="col-md-6"
              value={testcase}
              name="testcase"
              placeholder="Select Testcases..."
              isRequired
            />
            <FormSelect
              label="Environment"
              options={environmentsOptions}
              onChange={onSelectChange}
              className="col-md-6"
              value={environment}
              name="environment"
              placeholder="Select Environments..."
              isRequired
            />
            <div className="col-md-12 mb-3">
              <label>
                Frequency<span className="text-danger">*</span>
              </label>
              <div className="pt-1">
                {frequecyTypes.map((item, index) => (
                  <Button
                    key={index}
                    className="mx-1 text-capitalize"
                    size="sm"
                    variant={frequencyType === item ? "success" : "primary"}
                    onClick={onInputChange}
                    name="frequencyType"
                    value={item}
                  >
                    {item}
                  </Button>
                ))}
              </div>
            </div>

            {frequencyType === "custom" && (
              <div className="col-md-12 alert-secondary rounded py-2 mb-3">
                <SetCustomTimeInput
                  value={frequencyValue}
                  handleChange={(value) => onChange("frequencyValue", value)}
                />
              </div>
            )}

            {frequencyType && (
              <>
                <FormInput
                  label="Start Date/Time"
                  type="datetime-local"
                  className="col-md-6"
                  value={startDateTime}
                  name="startDateTime"
                  onChange={onInputChange}
                  isRequired
                />
                {frequencyType !== "oneTime" && (
                  <FormInput
                    label="End Date/Time"
                    type="datetime-local"
                    className="col-md-6"
                    value={endDateTime}
                    name="endDateTime"
                    onChange={onInputChange}
                  />
                )}
              </>
            )}
          </Row>
        </ViewComponent>
      </Form>
    )
  );
};

AddNewSchedule.propTypes = {
  isLoading: PropTypes.bool,
  data: PropTypes.shape({
    testcase: PropTypes.object,
    environment: PropTypes.object,
    frequencyType: PropTypes.string,
    frequencyValue: PropTypes.object,
    startDateTime: PropTypes.string,
    endDateTime: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  options: PropTypes.shape({
    environments: PropTypes.array,
    testcases: PropTypes.array,
  }).isRequired,
};

export default AddNewSchedule;
