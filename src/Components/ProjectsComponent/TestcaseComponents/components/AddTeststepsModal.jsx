import React, { useRef } from "react";
import { Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";

import { CustomModal } from "Components/CustomComponents";
import { SaveButton } from "Components/forms/Buttons/index";
import SelectedTeststepComponent from "./SelectedTeststepComponent";

const AddTeststepsModal = ({
  show,
  onClose,
  onAddTeststepDataSave,
  onRemoveSelectedTeststep,
  onSelectedTeststepsChange,
  onSelectedTeststepOrderChange,
  selectedTeststeps,
  teststepsOptions,
  onTestdataChangeInSelectedTeststep,
}) => {
  const draggingItem = useRef();
  const dragOverItem = useRef();

  const { updatedOptions } = teststepsOptions;

  const onSave = () => {
    onAddTeststepDataSave();
    onClose();
  };

  const handleDragStart = (position) => {
    draggingItem.current = position;
  };

  const handleDragEnter = (position) => {
    dragOverItem.current = position;
    const listCopy = [...selectedTeststeps];
    const draggingItemContent = listCopy[draggingItem.current];
    listCopy.splice(draggingItem.current, 1);
    listCopy.splice(dragOverItem.current, 0, draggingItemContent);

    draggingItem.current = dragOverItem.current;
    dragOverItem.current = null;
    onSelectedTeststepOrderChange(listCopy);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // check whether all teststeps have atleast one testdata selected
  const isSaveButtonDisabled =
    !selectedTeststeps.length ||
    !!selectedTeststeps?.find(
      ({ selected_testdata: selectedTestdata }) =>
        selectedTestdata?.length === 0
    );

  return (
    <CustomModal
      show={show}
      onClose={onClose}
      size="lg"
      title="Edit Teststeps in Testcase"
      scrollable
    >
      <CustomModal.Body>
        <Row>
          <Col md={4} className="border-end">
            <h6 className="text-center">Teststeps</h6>
            <hr />
            {updatedOptions.map((item, index) => (
              <div
                key={index}
                className="w-100 py-1 px-3 rounded"
                onClick={() => onSelectedTeststepsChange(item)}
              >
                {item?.name}
              </div>
            ))}
          </Col>
          <Col md={8}>
            <h6 className="text-center">Selected Teststeps</h6>
            <hr />
            <div className="background-secondary rounded py-2 px-3">
              {selectedTeststeps?.map((item, index) => {
                return (
                  <div
                    key={index}
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={handleDragOver}
                    onDragEnter={() => handleDragEnter(index)}
                    draggable
                  >
                    <SelectedTeststepComponent
                      data={item}
                      index={index}
                      onRemoveSelectedTeststep={onRemoveSelectedTeststep}
                      onTestdataChangeInSelectedTeststep={
                        onTestdataChangeInSelectedTeststep
                      }
                    />
                  </div>
                );
              })}
            </div>
          </Col>
        </Row>
      </CustomModal.Body>
      <CustomModal.Footer>
        <SaveButton handleClick={onSave} disabled={isSaveButtonDisabled} />
      </CustomModal.Footer>
    </CustomModal>
  );
};

AddTeststepsModal.propTypes = {
  teststepsOptions: PropTypes.shape({
    updatedOptions: PropTypes.array.isRequired,
  }).isRequired,
  onSelectedTeststepsChange: PropTypes.func.isRequired,
  selectedTeststeps: PropTypes.array.isRequired,
  onRemoveSelectedTeststep: PropTypes.func.isRequired,
  onTestdataChangeInSelectedTeststep: PropTypes.func.isRequired,
  onAddTeststepDataSave: PropTypes.func.isRequired,
  show: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onSelectedTeststepOrderChange: PropTypes.func.isRequired,
};

export default AddTeststepsModal;
