import React from "react";
import { components } from "react-select";
import { Envelope } from "react-bootstrap-icons";
import PropTypes from "prop-types";

const UsersMultiValueLabel = ({ data, ...props }) => {
  const { label, __isNew__ } = data;

  return (
    <components.MultiValueLabel {...props}>
      {__isNew__ ? (
        <div className="d-flex justify-content-between align-items-center">
          <Envelope size={24} className="me-2" />
          <div>
            {label}
            <div>
              <small className="text-muted">Invite by email</small>
            </div>
          </div>
        </div>
      ) : (
        label
      )}
    </components.MultiValueLabel>
  );
};

UsersMultiValueLabel.propTypes = {
  data: PropTypes.shape({
    label: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
    __isNew__: PropTypes.bool,
  }).isRequired,
};

export default UsersMultiValueLabel;
