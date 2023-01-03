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

  const isValidNewOption = (inputValue) => validateEmail(inputValue);

  return (
    <CreatableAsyncSelect
      isMulti
      cacheOptions
      defaultOptions
      value={value}
      isValidNewOption={isValidNewOption}
      onChange={onChange}
      loadOptions={loadOptions}
      formatCreateLabel={formatCreateLabel}
      components={{ MultiValueLabel: UsersMultiValueLabel }}
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
