import React from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

import FormInput from "Components/forms/Inputs/FormInput";
import FormSelect from "Components/forms/Inputs/FormSelect";
import Loader from "Components/Loader";
import { ViewComponent } from "Components/CustomComponents";

import convertToSlug from "utils/convertToSlug";

import { NAME_FIELD_MAX_LENGTH } from "constants/appConstants";

const AddNewTestsuite = ({
  cat,
  data,
  isLoading,
  onChange,
  onSubmit,
  testcasesOptions,
}) => {
  const { name, testcases } = data;

  const isEditForm = cat === "edit";

  // handles input field change
  const onInputChange = (e) => onChange(e.target.name, e.target.value);
  // handles select filed change
  const onSelectChange = (value, { name }) => onChange(name, value);

  // check whether all fields are filled and used enable/disable the save button
  const isSaveButtonDisabled = isLoading || !name || testcases?.length === 0;

  const nameBottomInfoText =
    name && `Your testsuite will be created as ${convertToSlug(name)}`;

  const viewComponentTitle = isEditForm ? name : "Add New Testsuite";

  return (
    <Form className="w-100">
      <ViewComponent
        title={viewComponentTitle}
        type="save"
        onSave={onSubmit}
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
              onChange={onInputChange}
              text={nameBottomInfoText}
              maxLength={NAME_FIELD_MAX_LENGTH}
              isRequired
            />
            <FormSelect
              label="Testcases"
              name="testcases"
              options={testcasesOptions}
              value={testcases}
              onChange={onSelectChange}
              isRequired
              isMulti
            />
          </>
        )}
      </ViewComponent>
    </Form>
  );
};

AddNewTestsuite.defaultProps = {
  data: {
    name: "",
    testcases: [],
  },
};

AddNewTestsuite.propTypes = {
  cat: PropTypes.oneOf(["add", "edit"]).isRequired,
  isLoading: PropTypes.bool,
  data: PropTypes.shape({
    name: PropTypes.string,
    testcases: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  testcasesOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AddNewTestsuite;
