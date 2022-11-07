import React from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

import FormInput from "Components/forms/Inputs/FormInput";
import FormSelect from "Components/forms/Inputs/FormSelect";
import { ViewComponent } from "Components/CustomComponents";

import ConvertToSlug from "utils/ConvertToSlug";
import { formTitle } from "utils/helper";

const AddNewTestsuite = ({ cat, data, onChange, onSubmit }) => {
  const { name, testcases, testcasesOptions } = data;

  const onInpChange = (e) => {
    onChange(e.target.name, e.target.value);
  };

  return (
    <Form className="w-100">
      <ViewComponent
        title={formTitle(cat)}
        type="save"
        onSave={onSubmit}
        onSaveDisabled={name.length === 0 || testcases.length === 0}
      >
        <FormInput
          label="Name"
          placeholder="Name"
          name="name"
          value={name}
          onChange={onInpChange}
          text={
            name?.length !== 0 &&
            `Your testsuite will be created as ${ConvertToSlug(name)}`
          }
          disabled={cat === "edit"}
          isRequired
        />
        <FormSelect
          label="Testcases"
          name="testcases"
          options={testcasesOptions}
          value={testcases}
          handlechange={onChange}
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
  cat: PropTypes.oneOf(["add", "edit"]),
  data: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AddNewTestsuite;
