import React from "react";
import { Image, NavDropdown } from "react-bootstrap";
import { Gear, PersonCircle } from "react-bootstrap-icons";
import PropTypes from "prop-types";

import { ORG_ROLES } from "constants/roleConstants";

const OrgMemberTableRow = ({
  data,
  openChangeRoleModal,
  onRemoveMember,
  isCurrUserOrgOwner,
}) => {
  const {
    id,
    name,
    username,
    image,
    is_super_admin: isOrgOwner,
    is_admin: isProjectAdmin,
  } = data;

  const memberRole = isOrgOwner
    ? ORG_ROLES.OWNER
    : isProjectAdmin
    ? ORG_ROLES.PROJECT_ADMIN
    : ORG_ROLES.MEMBER;

  const onChangeRoleClick = () => openChangeRoleModal(id, memberRole);

  return (
    <tr className="align-middle">
      <td>
        <div className="d-flex align-items-center">
          {image ? (
            <Image
              src={image}
              alt={name}
              width={48}
              height={48}
              roundedCircle
            />
          ) : (
            <PersonCircle size={48} className="text-muted" />
          )}
          <div className="ps-3">
            <div className="text-capitalize">{name}</div>
            <small className="text-muted">{username}</small>
          </div>
        </div>
      </td>
      <td>{memberRole}</td>
      {isCurrUserOrgOwner && (
        <td>
          <NavDropdown
            title={<Gear size={16} />}
            className={`d-inline-block ${isOrgOwner && "text-muted"}`}
            disabled={isOrgOwner}
          >
            <NavDropdown.Item onClick={onChangeRoleClick}>
              Change Role
            </NavDropdown.Item>
            <NavDropdown.Item onClick={() => onRemoveMember(id)}>
              Remove from Organization
            </NavDropdown.Item>
          </NavDropdown>
        </td>
      )}
    </tr>
  );
};

OrgMemberTableRow.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    username: PropTypes.string,
    image: PropTypes.string,
    is_super_admin: PropTypes.bool,
    is_admin: PropTypes.bool,
  }).isRequired,
  openChangeRoleModal: PropTypes.func.isRequired,
  onRemoveMember: PropTypes.func.isRequired,
  isCurrUserOrgOwner: PropTypes.bool,
};

export default React.memo(OrgMemberTableRow);
