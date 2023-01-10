import React from "react";
import { Image, NavDropdown } from "react-bootstrap";
import { Gear, PersonCircle } from "react-bootstrap-icons";
import PropTypes from "prop-types";

const OrgMemberTableRow = ({ data }) => {
  const {
    name,
    username,
    image,
    is_super_admin: isOrgOwner,
    is_admin: isProjectAdmin,
  } = data;

  const memberRole = isOrgOwner
    ? "Owner"
    : isProjectAdmin
    ? "Project Admin"
    : "Member";

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
      <td>
        <NavDropdown title={<Gear size={16} />} className="d-inline-block">
          <NavDropdown.Item>Change Role</NavDropdown.Item>
          <NavDropdown.Item>Remove from Organization</NavDropdown.Item>
        </NavDropdown>
      </td>
    </tr>
  );
};

OrgMemberTableRow.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    username: PropTypes.string,
    image: PropTypes.string,
    is_super_admin: PropTypes.bool,
    is_admin: PropTypes.bool,
  }).isRequired,
};

export default OrgMemberTableRow;
