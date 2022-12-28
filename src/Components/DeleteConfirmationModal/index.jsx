import React from "react";
import PropTypes from "prop-types";

import { CustomModal } from "Components/CustomComponents";
import { CloseButton, DeleteButton } from "Components/forms/Buttons";

const DeleteConfirmationModal = (props) => {
  const { handleClose, onDelete, show, title, text } = props;

  return (
    <CustomModal
      show={show}
      title={title ? title : "Are You Sure?"}
      onClose={handleClose}
    >
      <CustomModal.Body>
        {text ? text : "Are you sure you want to DELETE this item?"}
      </CustomModal.Body>
      <CustomModal.Footer>
        <CloseButton label="Cancel" handleClick={handleClose} />
        <DeleteButton handleClick={onDelete} />
      </CustomModal.Footer>
    </CustomModal>
  );
};

export default DeleteConfirmationModal;

DeleteConfirmationModal.propTypes = {
  show: PropTypes.bool,
  title: PropTypes.string,
  handleClose: PropTypes.func,
  onDelete: PropTypes.func,
  text: PropTypes.string,
};
