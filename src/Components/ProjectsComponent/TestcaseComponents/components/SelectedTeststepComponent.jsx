import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  GripVertical,
  Trash3Fill,
} from "react-bootstrap-icons";
import classNames from "classnames";
import { Collapse } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";

import FormCheckBox from "Components/forms/Inputs/FormCheckBox";

import { buildRoute } from "utils/helper";

import { TESTSTEP_ROUTE } from "constants/routeConstants";

const SelectedTeststepComponent = ({
  data,
  index,
  onRemoveSelectedTeststep,
  onTestdataChangeInSelectedTeststep,
}) => {
  const {
    testdata,
    selected_testdata: selectedTestdataIds,
    id: teststepId,
    name: teststepName,
  } = data;

  const { projectName } = useParams();

  const [isOpenCollapse, setIsOpenCollapse] = useState(false);

  const onChangeTestdata = (e) => {
    const value = Number(e.target.name);

    let selectedTestdata = [...selectedTestdataIds];

    if (selectedTestdata?.includes(value)) {
      // remove from array
      selectedTestdata?.splice(selectedTestdata.indexOf(value), 1);
    } else {
      // Add to the array
      selectedTestdata?.push(value);
    }

    onTestdataChangeInSelectedTeststep({
      ...data,
      selected_testdata: selectedTestdata,
    });
  };

  // helps to toggle collapse component
  const toggleCollapse = () => setIsOpenCollapse(!isOpenCollapse);

  const handleRemoveSelectedTeststeps = () => onRemoveSelectedTeststep(index);

  // check whether at least one testdata is selected for teststep
  const isAtleastOneTestdataSelected = !!selectedTestdataIds?.length;

  // container classes on basis of conditions
  const containerClasses = classNames(
    "bg-white py-2 rounded d-flex align-items-center justify-content-between border",
    {
      [`border-${isAtleastOneTestdataSelected ? "primary" : "danger"}`]: true,
    }
  );

  // body classes on basis of condition - for collapse component
  const bodyClasses = classNames(
    "bg-white py-2 px-4 border rounded border-top-0 text-break",
    {
      [`border-${isAtleastOneTestdataSelected ? "primary" : "danger"}`]: true,
    }
  );

  const teststepRoute = buildRoute(TESTSTEP_ROUTE, {
    projectName,
    id: teststepId,
  });

  return (
    <div className="rounded my-2" draggable>
      <div className={containerClasses} onClick={toggleCollapse}>
        <GripVertical />
        <div className="ps-2 pe-4 w-100 d-flex justify-content-between align-items-center">
          <label>{teststepName}</label>
          <span>
            {isOpenCollapse ? <ChevronUp /> : <ChevronDown />}
            <Trash3Fill
              role="button"
              className="text-danger ms-2"
              onClick={handleRemoveSelectedTeststeps}
            />
          </span>
        </div>
      </div>
      <Collapse in={isOpenCollapse}>
        <div className={bodyClasses}>
          {!testdata?.length ? (
            <small>
              Testdata not added in this teststep, kindly add at least one
              testdata in <Link to={teststepRoute}>{teststepName}</Link>
            </small>
          ) : (
            !isAtleastOneTestdataSelected && (
              <small className="text-danger">
                Select at least one testdata.
              </small>
            )
          )}
          {testdata?.map(({ id, name }, index) => (
            <div key={index}>
              <FormCheckBox
                label={name}
                name={id}
                checked={selectedTestdataIds?.includes(id)}
                onChange={onChangeTestdata}
              />
            </div>
          ))}
        </div>
      </Collapse>
    </div>
  );
};

SelectedTeststepComponent.propTypes = {
  data: PropTypes.shape({
    testdata: PropTypes.array.isRequired,
    selected_testdata: PropTypes.array.isRequired,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  onRemoveSelectedTeststep: PropTypes.func.isRequired,
  onTestdataChangeInSelectedTeststep: PropTypes.func.isRequired,
};

export default SelectedTeststepComponent;
