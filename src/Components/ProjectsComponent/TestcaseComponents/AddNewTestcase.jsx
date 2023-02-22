import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { X as CancelIcon } from "react-bootstrap-icons";
import PropTypes from "prop-types";

import AddTeststepsModal from "./components/AddTeststepsModal";
import { FormInput } from "Components/forms/Inputs";
import { ViewComponent } from "Components/CustomComponents";

import { convertToSlug } from "utils";

import { NAME_FIELD_MAX_LENGTH } from "constants/appConstants";

import "./style.css";

const TeststepBadge = ({ stepName, onDeleteSelectedTeststep, index }) => {
  const onRemoveTeststep = () => onDeleteSelectedTeststep(index);

  return (
    <div
      key={index}
      className="bg-secondary badge mb-1 me-1 rounded text-light p-0 m-0 h-100"
    >
      <div className="d-flex justify-content-center align-items-center h-100">
        <label className="ps-2 pe-1 py-1">{stepName}</label>
        <CancelIcon
          className="h-100 cancel-button rounded"
          size={16}
          role="button"
          onClick={onRemoveTeststep}
        />
      </div>
    </div>
  );
};

const AddNewTestcase = (props) => {
  const {
    cat,
    data,
    isLoading,
    selectedTeststeps,
    onAddTeststepDataSave,
    onchange,
    onRemoveSelectedTeststep,
    onSelectedTeststepOrderChange,
    onSelectedTeststepsChange,
    onSubmit,
    onTestdataChangeInSelectedTeststep,
    teststepsOptions,
    onDeleteSelectedTeststep,
  } = props;

  const { name, description, arrayOfTeststeps: teststeps } = data;

  const [showteststepModal, setShowteststepModal] = useState(false);

  const isEditForm = cat === "edit";

  const handleChange = (e) => {
    onchange(e.target.name, e.target.value);
  };

  const toggleTeststepModal = () => {
    setShowteststepModal(!showteststepModal);
  };

  const isSaveDisabled = isLoading || !name || !teststeps?.length;

  const nameInputBottomTextMsg =
    !!name.length && `Your testcase will be created as ${convertToSlug(name)}`;

  const viewComponentTitle = isEditForm ? name : "Add New Testcase";

  return (
    <Form className="w-100" onSubmit={onSubmit}>
      <ViewComponent
        title={viewComponentTitle}
        type="save"
        onSave={onSubmit}
        isLoading={isLoading}
        isSaveDisabled={isSaveDisabled}
      >
        <AddTeststepsModal
          show={showteststepModal}
          onClose={toggleTeststepModal}
          teststepsOptions={teststepsOptions}
          onSelectedTeststepsChange={onSelectedTeststepsChange}
          selectedTeststeps={selectedTeststeps}
          onAddTeststepDataSave={onAddTeststepDataSave}
          onRemoveSelectedTeststep={onRemoveSelectedTeststep}
          onSelectedTeststepOrderChange={onSelectedTeststepOrderChange}
          onTestdataChangeInSelectedTeststep={
            onTestdataChangeInSelectedTeststep
          }
        />
        <FormInput
          label="Name"
          placeholder="Name"
          name="name"
          value={name}
          onChange={handleChange}
          text={nameInputBottomTextMsg}
          maxLength={NAME_FIELD_MAX_LENGTH}
          isRequired
        />
        <FormInput
          type="textarea"
          rows={2}
          label="Description"
          placeholder="Write short description here..."
          name="description"
          value={description}
          onChange={handleChange}
        />

        <div>
          <label>
            Teststeps<span className="text-danger">*</span>
          </label>
          <div className="background-secondary py-3 px-3 rounded">
            {teststeps?.map(({ name: stepName }, index) => (
              <TeststepBadge
                key={index}
                stepName={stepName}
                index={index}
                onDeleteSelectedTeststep={onDeleteSelectedTeststep}
              />
            ))}
            <small
              className={`text-success px-3 w-100 ${
                !teststeps?.length && "d-flex justify-content-center"
              }`}
              role="button"
              onClick={toggleTeststepModal}
            >
              + Add More
            </small>
          </div>
        </div>
      </ViewComponent>
    </Form>
  );
};

TeststepBadge.propTypes = {
  stepName: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  onDeleteSelectedTeststep: PropTypes.func.isRequired,
};

AddNewTestcase.propTypes = {
  cat: PropTypes.string,
  data: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    arrayOfTeststeps: PropTypes.array,
  }).isRequired,
  isLoading: PropTypes.bool,
  selectedTeststeps: PropTypes.array,
  onchange: PropTypes.func,
  onRemoveSelectedTeststep: PropTypes.func,
  onSelectedTeststepOrderChange: PropTypes.func,
  onSelectedTeststepsChange: PropTypes.func,
  onSubmit: PropTypes.func,
  teststepsOptions: PropTypes.objectOf(PropTypes.array),
  onTestdataChangeInSelectedTeststep: PropTypes.func,
  onAddTeststepDataSave: PropTypes.func,
  onDeleteSelectedTeststep: PropTypes.func.isRequired,
};

export default AddNewTestcase;
