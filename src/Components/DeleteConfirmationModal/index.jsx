import React from "react";
import PropTypes from "prop-types";

import { CustomModal } from "Components/CustomComponents";
import { CloseButton, DeleteButton } from "Components/forms/Buttons";

const DeleteConfirmationModal = ({
  show,
  title,
  text,
  handleClose,
  onDelete,
}) => (
  <CustomModal show={show} title={title} onClose={handleClose}>
    <CustomModal.Body>{text}</CustomModal.Body>
    <CustomModal.Footer>
      <CloseButton label="Cancel" handleClick={handleClose} />
      <DeleteButton handleClick={onDelete} />
    </CustomModal.Footer>
  </CustomModal>
);

DeleteConfirmationModal.propTypes = {
  show: PropTypes.bool,
  title: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
};

DeleteConfirmationModal.defaultProps = {
  title: "Are You Sure?",
  text: "Are you sure you want to DELETE this item?",
};

export default DeleteConfirmationModal;
