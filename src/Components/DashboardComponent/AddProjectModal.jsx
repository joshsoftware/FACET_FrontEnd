import React from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

import { CustomModal } from "Components/CustomComponents";
import { CloseButton, SaveButton } from "Components/forms/Buttons";
import { FormInput } from "Components/forms/Inputs";

import { NAME_FIELD_MAX_LENGTH } from "constants/appConstants";

const AddProjectModal = ({ data, onChange, onSubmit, show, handleClose }) => {
  const { name, description } = data;

  return (
    <CustomModal show={show} onClose={handleClose} title="Add New Project">
      <Form onSubmit={onSubmit}>
        <CustomModal.Body>
          <FormInput
            label="Name"
            placeholder="Enter Name"
            name="name"
            value={name}
            onChange={onChange}
            maxLength={NAME_FIELD_MAX_LENGTH}
            isRequired
          />
          <FormInput
            label="Description"
            placeholder="Write Description"
            name="description"
            value={description}
            onChange={onChange}
            type="textarea"
          />
        </CustomModal.Body>
        <CustomModal.Footer>
          <CloseButton handleClick={handleClose} />
          <SaveButton disabled={!name.length} />
        </CustomModal.Footer>
      </Form>
    </CustomModal>
  );
};

AddProjectModal.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  show: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AddProjectModal;
