import React from "react";
import { Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";

import CustomModal from "Components/CustomComponents/CustomModal";
import FormInput from "Components/forms/Inputs/FormInput";
import FormSelect from "Components/forms/Inputs/FormSelect";
import JSONView from "Components/JSONView";
import { SaveButton } from "Components/forms/Buttons/index";

const statusOptions = [
  { label: "Passed", value: "passed" },
  { label: "Failed", value: "failed" },
];

const TestFieldCommentModal = ({
  show,
  onCloseModal,
  data,
  onChangeCommentForm,
  onCommentFormSubmit,
}) => {
  const {
    field,
    status,
    expectedValue,
    responseValue,
    executedStatus,
    comment,
  } = data;

  const isStatusChanged = status !== executedStatus;

  const handleInputChange = (e) => {
    onChangeCommentForm(e.target.name, e.target.value);
  };

  return (
    <CustomModal show={show} size="lg" onClose={onCloseModal} title={field}>
      <CustomModal.Body>
        <>
          <Row className="mb-3">
            <Col md={6}>
              <label>Expected Value</label>
              <JSONView data={expectedValue} />
            </Col>
            <Col md={6}>
              <label>Response Value</label>
              <JSONView data={responseValue} />
            </Col>
          </Row>
          <FormSelect
            label="Status"
            options={statusOptions}
            value={status}
            name="status"
            handlechange={onChangeCommentForm}
            isRequired
          />
          <FormInput
            label="Comment"
            type="textarea"
            rows={2}
            placeholder="Write the comment here..."
            name="comment"
            value={comment}
            onChange={handleInputChange}
            disabled={!isStatusChanged}
            isRequired
          />
          {isStatusChanged && (
            <SaveButton
              handleClick={onCommentFormSubmit}
              disabled={comment?.length === 0}
            />
          )}
        </>
      </CustomModal.Body>
    </CustomModal>
  );
};

TestFieldCommentModal.propTypes = {
  show: PropTypes.bool,
  onCloseModal: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  onChangeCommentForm: PropTypes.func.isRequired,
  onCommentFormSubmit: PropTypes.func.isRequired,
};

export default TestFieldCommentModal;
