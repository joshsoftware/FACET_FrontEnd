import React from "react";
import { PersonCircle } from "react-bootstrap-icons";
import { NavDropdown } from "react-bootstrap";
import PropTypes from "prop-types";

const MemberTableRow = ({ index, data, isProjectAdmin, onRemoveMember }) => {
  const { id, name, is_project_admin: isMemberProjectAdmin } = data;

  const memberRole = isMemberProjectAdmin ? "Project Owner" : "Member";

  const handleRemoveMemberClick = () => {
    onRemoveMember(id);
  };

  return (
    <tr>
      <td>{index}</td>
      <td className="text-capitalize">
        <PersonCircle size={24} className="mx-2" />
        {name}
      </td>
      <td>{memberRole}</td>
      {isProjectAdmin && (
        <td>
          <NavDropdown
            title="More"
            disabled={isMemberProjectAdmin}
            className={isMemberProjectAdmin && "text-muted"}
          >
            <NavDropdown.Item
              onClick={handleRemoveMemberClick}
              className="text-danger"
            >
              Remove from Project
            </NavDropdown.Item>
          </NavDropdown>
        </td>
      )}
    </tr>
  );
};

MemberTableRow.propTypes = {
  index: PropTypes.number.isRequired,
  data: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    is_project_admin: PropTypes.bool,
  }).isRequired,
  isProjectAdmin: PropTypes.bool,
  onRemoveMember: PropTypes.func.isRequired,
};

export default MemberTableRow;
