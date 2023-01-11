import React from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

import CustomModal from "Components/CustomComponents/CustomModal";
import FormCheckBox from "Components/forms/Inputs/FormCheckBox";
import { SaveButton } from "Components/forms/Buttons";

import { ORG_MEMBERS_ROLE } from "constants/orgMemberConstants";

const ChangeOrgMemberRole = ({ data, show, onChange, onClose, onSubmit }) => {
  const { currRole, updatedRole } = data;

  // check whether role of member is changed or not
  const isRoleChanged = currRole !== updatedRole;

  return (
    <CustomModal show={show} title="Change Role" onClose={onClose}>
      <Form onSubmit={onSubmit}>
        <CustomModal.Body>
          <h6>Select a new role</h6>
          {ORG_MEMBERS_ROLE?.map(({ title, subTitle, value }, index) => (
            <FormCheckBox
              type="radio"
              name="role"
              value={value}
              onChange={onChange}
              checked={value === updatedRole}
              label={
                <>
                  <div>{title}</div>
                  <small className="text-muted">{subTitle}</small>
                </>
              }
              className="py-1"
              key={index}
            />
          ))}
        </CustomModal.Body>
        <CustomModal.Footer>
          <SaveButton type="submit" disabled={!isRoleChanged} />
        </CustomModal.Footer>
      </Form>
    </CustomModal>
  );
};

ChangeOrgMemberRole.propTypes = {
  data: PropTypes.shape({
    member: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    currRole: PropTypes.string,
    updatedRole: PropTypes.string,
  }).isRequired,
  show: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default React.memo(ChangeOrgMemberRole);
