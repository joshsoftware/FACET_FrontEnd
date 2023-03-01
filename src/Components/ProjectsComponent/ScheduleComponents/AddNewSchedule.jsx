import React from "react";
import { Button, Form, Row } from "react-bootstrap";
import PropTypes from "prop-types";

import FormInput from "Components/forms/Inputs/FormInput";
import FormSelect from "Components/forms/Inputs/FormSelect";
import FormCheckBox from "Components/forms/Inputs/FormCheckBox";
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

const AddNewSchedule = ({
  data,
  onChange,
  onSubmit,
  testcaseOptions,
  testsuiteOptions,
  environmentOptions,
}) => {
  const {
    level,
    testcase,
    testsuite,
    environment,
    frequencyType,
    frequencyValue,
    startDateTime,
    endDateTime,
  } = data;

  // on change input
  const onInputChange = (e) => onChange(e.target.name, e.target.value);

  // on FormSelect Changes
  const onSelectChange = (value, { name }) => onChange(name, value);

  // helps to change frequency value
  const onChangeFrequencyValue = (value) => onChange("frequencyValue", value);

  // it checks whether all entries of form filled or not, if not it will disable the save button
  // testcase and evironment is object if selected otherwise it will be null
  const isSaveButtonDisabled =
    !level ||
    (level === "testcase" ? !testcase : !testsuite) ||
    !environment ||
    !frequencyType ||
    !startDateTime;

  return (
    <Form onSubmit={onSubmit}>
      <ViewComponent
        title="Schedule New Testcase/Testsuite"
        type="save"
        onSave={onSubmit}
        isSaveDisabled={isSaveButtonDisabled}
      >
        <Row className="mb-3">
          <label className="mb-2">
            Select the component you want to schedule{" "}
            <span className="text-danger">*</span>
          </label>
          <div className="d-flex">
            <FormCheckBox
              type="radio"
              label="Testcase"
              name="level"
              value="testcase"
              onChange={onInputChange}
              checked={level === "testcase"}
            />
            <FormCheckBox
              type="radio"
              label="Testsuite"
              name="level"
              value="testsuite"
              onChange={onInputChange}
              checked={level === "testsuite"}
              className="ms-3"
            />
          </div>
        </Row>
        {level && (
          <Row>
            {level === "testcase" ? (
              <FormSelect
                label="Testcase"
                options={testcaseOptions}
                onChange={onSelectChange}
                className="col-md-6"
                value={testcase}
                name="testcase"
                placeholder="Select Testcases..."
                isRequired
              />
            ) : (
              <FormSelect
                label="Testsuite"
                options={testsuiteOptions}
                onChange={onSelectChange}
                className="col-md-6"
                value={testsuite}
                name="testsuite"
                placeholder="Select Testsuite..."
                isRequired
              />
            )}
            <FormSelect
              label="Environment"
              options={environmentOptions}
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
                  handleChange={onChangeFrequencyValue}
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
        )}
      </ViewComponent>
    </Form>
  );
};

const optionsPropTypes = PropTypes.shape({
  label: PropTypes.any,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
});

AddNewSchedule.propTypes = {
  isLoading: PropTypes.bool,
  data: PropTypes.shape({
    level: PropTypes.oneOf(["testcase", "testsuite"]),
    testcase: PropTypes.object,
    testsuite: PropTypes.object,
    environment: PropTypes.object,
    frequencyType: PropTypes.string,
    frequencyValue: PropTypes.object,
    startDateTime: PropTypes.string,
    endDateTime: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  testcaseOptions: PropTypes.arrayOf(optionsPropTypes).isRequired,
  testsuiteOptions: PropTypes.arrayOf(optionsPropTypes).isRequired,
  environmentOptions: PropTypes.arrayOf(optionsPropTypes).isRequired,
};

export default AddNewSchedule;
