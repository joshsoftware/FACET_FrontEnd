import React from "react";
import PropTypes from "prop-types";

import { CustomModal } from "Components/CustomComponents";
import FormSelect from "Components/forms/Inputs/FormSelect";
import { SaveButton } from "Components/forms/Buttons";

const AddAdminModal = ({
  usersOptions,
  onChange,
  onClose,
  onSubmit,
  show,
  data,
  isUsersLoading,
}) => (
  <CustomModal show={show} onClose={onClose} title="Add Admins">
    <CustomModal.Body>
      <FormSelect
        name="members"
        options={usersOptions}
        onChange={onChange}
        className="py-2"
        value={data}
        isMulti
        isLoading={isUsersLoading}
        isDisabled={isUsersLoading}
      />
      <SaveButton handleClick={onSubmit} />
    </CustomModal.Body>
  </CustomModal>
);

AddAdminModal.propTypes = {
  usersOptions: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  show: PropTypes.bool,
  isUsersLoading: PropTypes.bool,
};

export default AddAdminModal;
