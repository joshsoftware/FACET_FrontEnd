import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { X } from "react-bootstrap-icons";
import PropTypes from "prop-types";

import AddTeststepsModal from "./components/AddTeststepsModal";
import { ViewComponent } from "Components/CustomComponents";
import { FormInput } from "Components/forms/Inputs";

import { ConvertToSlug } from "utils";

import "./style.css";

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

  const handleChange = (e) => {
    onchange(e.target.name, e.target.value);
  };

  const toggleTeststepModal = () => {
    setShowteststepModal(!showteststepModal);
  };

  const isSaveDisabled = !name || !teststeps?.length;

  return (
    !isLoading &&
    typeof data === "object" &&
    Object.entries(data).length && (
      <Form className="w-100" onSubmit={onSubmit}>
        <ViewComponent
          title="Add New"
          type="save"
          onSave={onSubmit}
          onSaveDisabled={isSaveDisabled}
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
            value={data.name}
            onChange={handleChange}
            text={
              data.name.length !== 0
                ? `Your testcase will created as ${ConvertToSlug(data.name)}`
                : ""
            }
            isRequired
            disabled={cat === "edit"}
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
            <div className="background-secondary w-100 py-3 px-3 rounded d-flex">
              {teststeps?.map(({ name: stepName }, index) => (
                <div
                  key={index}
                  className="bg-secondary badge mb-1 me-1 rounded text-light d-flex justify-content-between align-items-center p-0"
                >
                  <label className="ps-2 pe-1 py-1">{stepName}</label>
                  <X
                    className="h-100 cancel-button rounded"
                    size={16}
                    role="button"
                    onClick={() => onDeleteSelectedTeststep(index)}
                  />
                </div>
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
    )
  );
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
