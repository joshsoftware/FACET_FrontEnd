import React from "react";
import PropTypes from "prop-types";

import { CustomModal } from "Components/CustomComponents";
import FormSelect from "Components/forms/Inputs/FormSelect";
import { SaveButton } from "Components/forms/Buttons";

const AddMembersInProject = ({
  show,
  handleClose,
  usersOptions,
  onChange,
  onSubmit,
  value,
  isLoading,
  isDisabled,
}) => (
  <CustomModal show={show} onClose={handleClose} title="Add Members">
    <CustomModal.Body>
      <FormSelect
        name="members"
        options={usersOptions}
        onChange={onChange}
        className="py-2"
        value={value}
        isMulti
        isLoading={isLoading}
        isDisabled={isDisabled}
      />
      <SaveButton handleClick={onSubmit} />
    </CustomModal.Body>
  </CustomModal>
);

AddMembersInProject.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  usersOptions: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  value: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
  isDisabled: PropTypes.bool,
};

export default AddMembersInProject;
