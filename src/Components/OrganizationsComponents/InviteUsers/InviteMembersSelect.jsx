import React from "react";
import PropTypes from "prop-types";

import CreatableAsyncSelect from "Components/forms/Inputs/CreatableAsyncSelect";
import UsersMultiValueLabel from "./UsersMultiValueLabel";

import { validateEmail } from "utils/helper";

const InviteMembersSelect = ({ org, value, loadOptions, onChange }) => {
  // helps to format label which created using AsyncCreatableSelect
  const formatCreateLabel = (inputValue) => (
    <div className="text-muted">
      Invite <span className="text-dark">{inputValue}</span> to {org}
    </div>
  );

  // check whether the new option is valid or not
  const isValidNewOption = (inputValue) => validateEmail(inputValue);

  return (
    <CreatableAsyncSelect
      value={value}
      loadOptions={loadOptions}
      onChange={onChange}
      formatCreateLabel={formatCreateLabel}
      components={{ MultiValueLabel: UsersMultiValueLabel }}
      isValidNewOption={isValidNewOption}
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
  loadOptions: PropTypes.func.isRequired,
};

export default InviteMembersSelect;
