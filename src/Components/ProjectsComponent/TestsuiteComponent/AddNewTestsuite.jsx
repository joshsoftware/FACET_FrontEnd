import React from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

import FormInput from "Components/forms/Inputs/FormInput";
import FormSelect from "Components/forms/Inputs/FormSelect";
import { ViewComponent } from "Components/CustomComponents";

import ConvertToSlug from "utils/ConvertToSlug";
import { formTitle } from "utils/helper";

const AddNewTestsuite = ({
  cat,
  data,
  onChange,
  onSubmit,
  testcasesOptions,
}) => {
  const { name, testcases } = data;

  // handles input field change
  const onInputChange = (e) => onChange(e.target.name, e.target.value);
  // handles select filed change
  const onSelectChange = (value, { name }) => onChange(name, value);

  // check whether all fields are filled and used enable/disable the save button
  const isSaveButtonDisabled = !name || testcases?.length === 0;

  const nameBottomInfoText =
    name && `Your testsuite will be created as ${ConvertToSlug(name)}`;

  return (
    <Form className="w-100">
      <ViewComponent
        title={formTitle(cat)}
        type="save"
        onSave={onSubmit}
        onSaveDisabled={isSaveButtonDisabled}
      >
        <FormInput
          label="Name"
          placeholder="Name"
          name="name"
          value={name}
          onChange={onInputChange}
          text={nameBottomInfoText}
          disabled={cat === "edit"}
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
  data: PropTypes.shape({
    name: PropTypes.string,
    testcases: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  testcasesOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AddNewTestsuite;
