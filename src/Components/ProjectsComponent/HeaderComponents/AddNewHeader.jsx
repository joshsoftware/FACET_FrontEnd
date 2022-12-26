import PropTypes from "prop-types";
import React from "react";
import { Form } from "react-bootstrap";

import { ViewComponent } from "Components/CustomComponents";
import { FormInput } from "Components/forms/Inputs";
import KeyValuePairsFormField from "Components/forms/KeyValuePairsFormField";
import { ConvertToSlug } from "utils";

const AddNewHeader = (props) => {
  const {
    cat,
    isLoading,
    data,
    onchange,
    onKeyValuePairsChange,
    handleSubmit,
  } = props;

  return (
    !isLoading &&
    data && (
      <Form onSubmit={handleSubmit} className="w-100">
        <ViewComponent title="Add New" type="save" onSave={handleSubmit}>
          <FormInput
            label="Name"
            placeholder="Name"
            name="name"
            value={data.name}
            onChange={onchange}
            isRequired
            disabled={cat === "edit"}
            text={
              data.name.length !== 0 &&
              `Your header will created as ${ConvertToSlug(data.name)}`
            }
          />
          <FormInput
            label="Header"
            element={
              <KeyValuePairsFormField
                data={data.header}
                setData={onKeyValuePairsChange}
              />
            }
            isRequired
          />
        </ViewComponent>
      </Form>
    )
  );
};

export default AddNewHeader;

AddNewHeader.propTypes = {
  cat: PropTypes.oneOf(["add", "edit"]),
  isLoading: PropTypes.bool,
  data: PropTypes.object,
  onchange: PropTypes.func,
  onKeyValuePairsChange: PropTypes.func,
  handleSubmit: PropTypes.func,
};

AddNewHeader.defaultProp = {
  data: {
    name: "",
    header: {},
  },
};
