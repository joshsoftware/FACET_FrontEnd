/* eslint-disable no-prototype-builtins */
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

import { CustomModal } from "Components/CustomComponents";
import { SaveButton } from "Components/forms/Buttons";
import { FormInput } from "Components/forms/Inputs";
import CheckBoxWithNumField from "./components/CheckBoxWithNumField";

const INITIAL_STRING_FIELDS = {
  maxLength: {
    name: "maxLength",
    label: "Maximum length",
    type: "checkbox-with-number-field",
    defaultValue: null,
  },
  minLength: {
    name: "minLength",
    label: "Minimum Length",
    type: "checkbox-with-number-field",
    defaultValue: null,
  },
  regex: {
    name: "regex",
    label: "Regex Pattern",
    type: "text",
    defaultValue: null,
  },
};

const INITIAL_NUMBER_FIELDS = {
  maxValue: {
    name: "maxValue",
    label: "Maximum Value",
    type: "checkbox-with-number-field",
    defaultValue: null,
  },
  minValue: {
    name: "minValue",
    label: "Minimum Value",
    type: "checkbox-with-number-field",
    defaultValue: null,
  },
};

const AddValidationFields = ({ data, onSuccess }) => {
  const [formData, setFormData] = useState({});
  const [finalData, setFinalData] = useState({});

  useEffect(() => {
    switch (data.type) {
      case "text":
        setFormData(INITIAL_STRING_FIELDS);
        break;

      case "number":
        setFormData(INITIAL_NUMBER_FIELDS);
        break;
      default:
        break;
    }
  }, [data]);

  const onchangeRegexField = (e) => {
    if (e.target.value === "") {
      let currData = { ...finalData };
      delete currData[e.target.name];
      setFinalData(currData);
    } else {
      setFinalData({ ...finalData, [e.target.name]: e.target.value });
    }
  };

  const onchangeField = (name, value) => {
    if (value === null) {
      let currData = { ...finalData };
      delete currData[name];
      setFinalData(currData);
    } else {
      setFinalData({ ...finalData, [name]: value });
    }
  };

  // eslint-disable-next-line no-unused-vars
  const getSettingFields = ([key, val]) => {
    switch (val.type) {
      case "checkbox-with-number-field":
        return (
          <CheckBoxWithNumField
            label={val.label}
            name={val.name}
            value={
              finalData?.hasOwnProperty(val.name) ? finalData[val.name] : 0
            }
            handlechange={onchangeField}
          />
        );

      default:
        return;
    }
  };

  return (
    <>
      <CustomModal.Body className="px-5">
        <h5>Add Validations</h5>
        <hr />
        {typeof formData === "object" && formData.hasOwnProperty("regex") && (
          <FormInput
            label={formData.regex.label}
            name={formData.regex.name}
            value={
              finalData.hasOwnProperty(formData.regex.name)
                ? finalData[formData.regex.name]
                : ""
            }
            onChange={onchangeRegexField}
          />
        )}
        <h6>Settings</h6>
        <Row>
          {Object.entries(formData).map((e, index) => {
            return (
              <Col md={6} key={index}>
                {getSettingFields(e)}
              </Col>
            );
          })}
        </Row>
      </CustomModal.Body>
      <CustomModal.Footer>
        <SaveButton handleClick={() => onSuccess(finalData)} />
      </CustomModal.Footer>
    </>
  );
};

export default AddValidationFields;

AddValidationFields.propTypes = {
  data: PropTypes.object,
  onSuccess: PropTypes.func,
};
