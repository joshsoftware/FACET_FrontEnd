import React from "react";
import { CheckLg, ExclamationTriangleFill } from "react-bootstrap-icons";
import PropTypes from "prop-types";

import CreatableSelect from "Components/forms/Inputs/CreatableSelect";
import UsersMultiValueLabel from "./UsersMultiValueLabel";

import { isValidEmail } from "utils/helper";
import { toastMessage } from "utils/toastMessage";

import { EMAIL_NOT_VALID } from "constants/userMessagesConstants";

const InviteMembersSelect = ({ org, value, onChange }) => {
  // helps to format label which created using AsyncCreatableSelect
  const formatCreateLabel = (inputValue) => (
    <div className="d-flex justify-content-between align-items-center disabled">
      <div className="text-muted">
        Invite <span className="text-dark">{inputValue}</span> to {org}
      </div>
      {isValidEmail(inputValue) ? (
        <CheckLg className="text-success" size={24} />
      ) : (
        <ExclamationTriangleFill className="text-danger" />
      )}
    </div>
  );

  // styles for react select
  const creatableAsyncSelectStyles = {
    multiValue: (styles) => ({
      ...styles,
      marginTop: 8,
      marginBottom: 8,
      marginLeft: 4,
      marginRight: 4,
    }),
    multiValueLabel: (styles) => ({
      ...styles,
      paddingLeft: 8,
      paddingTop: 4,
      paddingBottom: 4,
      paddingRight: 4,
    }),
  };

  // handles create new option in creatable select
  const onCreateNewOption = (inputValue) => {
    if (isValidEmail(inputValue)) {
      onChange((prevState) => [
        ...prevState,
        { value: inputValue, label: inputValue, __isNew__: true },
      ]);
    } else {
      toastMessage(EMAIL_NOT_VALID, "error");
    }
  };

  return (
    <CreatableSelect
      value={value}
      onChange={onChange}
      onCreateOption={onCreateNewOption}
      formatCreateLabel={formatCreateLabel}
      components={{ MultiValueLabel: UsersMultiValueLabel }}
      styles={creatableAsyncSelectStyles}
      isMulti
      cacheOptions
      defaultOptions
    />
  );
};

InviteMembersSelect.propTypes = {
  org: PropTypes.string.isRequired,
  value: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default InviteMembersSelect;
