import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Check2Circle, Infinity } from "react-bootstrap-icons";
import PropTypes from "prop-types";

import { CustomModal } from "Components/CustomComponents";
import { NextButton } from "Components/forms/Buttons";
import FormInput from "Components/forms/Inputs/FormInput";
import FieldBox from "./components/FieldBox";

import { hasWhiteSpace } from "utils";
import { toastMessage } from "utils/toastMessage";

import { ALL_FIELDS_REQUIRED } from "constants/userMessagesConstants";

const INITIAL_VALUE = {
  name: "",
  type: "",
};

const AddKeyField = ({ data, onSuccess }) => {
  const [formData, setFormData] = useState(INITIAL_VALUE);

  const onchange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onchangeType = (val) => {
    setFormData({ ...formData, type: val });
  };

  const onSave = () => {
    if (
      formData.name.length === 0 ||
      (formData.type !== "exact" && formData.type !== "dynamic")
    ) {
      toastMessage(ALL_FIELDS_REQUIRED, "error");
    } else {
      onSuccess({ name: formData.name, isExact: formData.type === "exact" });
      setFormData(INITIAL_VALUE);
    }
  };

  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name,
        type: data.isExact ? "exact" : "dynamic",
      });
    }
  }, [data]);

  return (
    <>
      <CustomModal.Body className="px-5">
        <h5>Add New Field</h5>
        <hr />
        <FormInput
          label="Name"
          name="name"
          type="text"
          onChange={onchange}
          value={formData.name}
          isRequired
          text="No space allowed for the key field."
          error={hasWhiteSpace(formData.name)}
        />
        <FormInput
          label="Type"
          name="isExact"
          element={
            <Row>
              <Col>
                <FieldBox
                  isActive={formData.type === "exact"}
                  item={{
                    name: "Exact",
                    icon: <Check2Circle fill="#198754" />,
                    tagline: "Exact value for the current Field",
                  }}
                  handleClick={() => onchangeType("exact")}
                />
              </Col>
              <Col>
                <FieldBox
                  isActive={formData.type === "dynamic"}
                  item={{
                    name: "Dynamic",
                    icon: <Infinity />,
                    tagline: "Dynamic Value or validations",
                  }}
                  // handleClick={() => onchangeType("dynamic")}
                />
                <small className="text-muted">Coming Soon</small>
              </Col>
            </Row>
          }
          isRequired
        />
      </CustomModal.Body>
      <CustomModal.Footer>
        <NextButton
          disabled={
            formData.name.length === 0 ||
            hasWhiteSpace(formData.name) ||
            (formData.type !== "exact" && formData.type !== "dynamic")
          }
          handleClick={onSave}
        />
      </CustomModal.Footer>
    </>
  );
};

export default AddKeyField;

AddKeyField.propTypes = {
  data: PropTypes.object,
  onSuccess: PropTypes.func,
};
