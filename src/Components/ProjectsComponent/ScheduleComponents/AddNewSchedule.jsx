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
  // on change input
  const onchange = (e) => onChange(e.target.name, e.target.value);

  // on FormSelect Changes
  const onSelectChange = (value, { name }) => onChange(name, value);

  const isSaveButtonDisabled =
    !testcase || !environment || !frequencyType || !startDateTime;

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
              options={options.testcases}
              onChange={onSelectChange}
              className="col-md-6"
              value={testcase}
              name="testcase"
              placeholder="Select Testcases..."
              isRequired
            />
            <FormSelect
              label="Environment"
              options={options.environments}
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
                {frequecyTypes.map((item, index) => {
                  return (
                    <Button
                      key={index}
                      className="mx-1 text-capitalize"
                      size="sm"
                      variant={frequencyType === item ? "success" : "primary"}
                      onClick={onchange}
                      name="frequencyType"
                      value={item}
                    >
                      {item}
                    </Button>
                  );
                })}
              </div>
            </div>

            {frequencyType === "custom" && (
              <div className="col-md-12 alert-secondary rounded py-2 mb-3">
                <SetCustomTimeInput
                  value={frequencyValue}
                  handleChange={(value) =>
                    onSelectChange("frequencyValue", value)
                  }
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
                  onChange={onchange}
                  isRequired
                />
                {frequencyType !== "oneTime" && (
                  <FormInput
                    label="End Date/Time"
                    type="datetime-local"
                    className="col-md-6"
                    value={endDateTime}
                    name="endDateTime"
                    onChange={onchange}
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
  data: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  options: PropTypes.objectOf(PropTypes.array).isRequired,
};

export default AddNewSchedule;
