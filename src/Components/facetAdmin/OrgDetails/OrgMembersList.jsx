import React from "react";
import { Container } from "react-bootstrap";
import PropTypes from "prop-types";

import { TableComponent } from "Components/CustomComponents";

import { convertRolesToStr } from "utils/organizationHelper";

const tableHeadings = ["#", "Member", "Email", "Role"];

const OrgMemberTableRow = ({ data, index }) => {
  const {
    name,
    username,
    email,
    is_admin: isAdmin,
    is_super_admin: isSuperAdmin,
  } = data;

  const role = convertRolesToStr(isSuperAdmin, isAdmin);

  return (
    <tr>
      <td>{index}</td>
      <td>
        <div>{name}</div>
        <small className="text-muted">{username}</small>
      </td>
      <td>{email}</td>
      <td>{role}</td>
    </tr>
  );
};

const OrgMembersList = ({ data }) => (
  <Container className="pt-3">
    <TableComponent headings={tableHeadings} striped className="align-middle">
      {data?.map((item, index) => (
        <OrgMemberTableRow key={index} data={item} index={index + 1} />
      ))}
    </TableComponent>
  </Container>
);

const userPropType = {
  name: PropTypes.string,
  username: PropTypes.string,
  email: PropTypes.string,
  is_admin: PropTypes.bool,
  is_super_admin: PropTypes.bool,
};

OrgMemberTableRow.propTypes = {
  data: PropTypes.shape(userPropType).isRequired,
  index: PropTypes.number.isRequired,
};

OrgMembersList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(userPropType)).isRequired,
};

export default OrgMembersList;
