import React from "react";
import PropTypes from "prop-types";

import CustomModal from "Components/CustomComponents/CustomModal";

const TestFieldCommentModal = ({ show, onCloseModal }) => {
  return (
    <CustomModal show={show} size="lg" onClose={onCloseModal}>
      <CustomModal.Body></CustomModal.Body>
    </CustomModal>
  );
};

TestFieldCommentModal.propTypes = {
  show: PropTypes.bool,
  onCloseModal: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

export default TestFieldCommentModal;
