import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { CustomModal } from "../../../CustomComponents";
import AddKeyField from "./AddKeyField";
import AddValueField from "./AddValueField";
import SelectFieldType from "./SelectFieldType";
import modalConstants from "./constants/modalConstants";
import AddValidationFields from "./AddValidationFields";

const INITIAL_VALUE = {
  name: "",
  type: "",
  value: "",
  isExact: true,
};

const ExpectedOutcomeModal = ({
  show,
  onClose,
  data,
  onAddNewField,
  onEditField,
}) => {
  const [modalStep, setModalStep] = useState(modalConstants.SELECT_FIELD);
  const [modalData, setModalData] = useState(data);

  const onSave = () => {
    setModalStep(modalConstants.SELECT_FIELD);
    if (data) {
      onEditField(modalData);
    } else {
      onAddNewField(modalData);
    }
    setModalData(INITIAL_VALUE);
  };

  const onSelectField = (val) => {
    setModalData({ ...modalData, type: val });
    setModalStep(modalConstants.ADD_KEY_FIELD);
  };

  const onAddKeyField = (val) => {
    setModalData({ ...modalData, ...val });
    if (val.isExact) {
      setModalStep(modalConstants.ADD_VALUE_FIELD);
    } else {
      setModalStep(modalConstants.ADD_VALIDATIONS_FIELD);
    }
  };

  const onAddValueField = (val) => {
    setModalStep(modalConstants.SAVE_FIELD);
    setModalData({ ...modalData, ...val });
  };

  const onAddValidationFields = (val) => {
    setModalStep(modalConstants.SAVE_FIELD);
    setModalData({ ...modalData, validations: val });
  };

  const modalBody = () => {
    switch (modalStep) {
      case modalConstants.SELECT_FIELD:
        return <SelectFieldType data={modalData} onSuccess={onSelectField} />;

      case modalConstants.ADD_KEY_FIELD:
        return <AddKeyField data={modalData} onSuccess={onAddKeyField} />;

      case modalConstants.ADD_VALUE_FIELD:
        return <AddValueField data={modalData} onSuccess={onAddValueField} />;

      case modalConstants.ADD_VALIDATIONS_FIELD:
        return (
          <AddValidationFields
            data={modalData}
            onSuccess={onAddValidationFields}
          />
        );

      default:
        return <SelectFieldType />;
    }
  };

  useEffect(() => {
    setModalData(data ? data : INITIAL_VALUE);
    if (data && data.type) {
      setModalStep(modalConstants.ADD_KEY_FIELD);
    }
  }, [data]);

  useEffect(() => {
    if (modalStep === modalConstants.SAVE_FIELD) {
      onSave();
      setModalStep(modalConstants.SELECT_FIELD);
    }
  }, [modalData, modalStep]);

  const handleClose = () => {
    setModalStep(modalConstants.SELECT_FIELD);
    setModalData(INITIAL_VALUE);
    onClose();
  };

  return (
    <>
      <CustomModal
        show={show}
        onClose={handleClose}
        centered
        size="lg"
        title="Add Expected Outcome Field"
      >
        {modalBody()}
      </CustomModal>
    </>
  );
};

export default ExpectedOutcomeModal;

ExpectedOutcomeModal.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
  data: PropTypes.object,
  onAddNewField: PropTypes.func,
  onEditField: PropTypes.func,
};
