import React from "react";
import { Container } from "react-bootstrap";
import PropTypes from "prop-types";

import { TableComponent } from "Components/CustomComponents";

import { convertRolesToStr } from "utils/organizationHelper";

const tableHeadings = ["#", "Member", "Email", "Role"];

const OrgMembersList = ({ data }) => {
  return (
    <Container className="pt-3">
      <TableComponent headings={tableHeadings} striped className="align-middle">
        {data?.map(
          (
            {
              name,
              username,
              email,
              is_admin: isAdmin,
              is_super_admin: isSuperAdmin,
            },
            index
          ) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <div>{name}</div>
                <small className="text-muted">{username}</small>
              </td>
              <td>{email}</td>
              <td>{convertRolesToStr(isSuperAdmin, isAdmin)}</td>
            </tr>
          )
        )}
      </TableComponent>
    </Container>
  );
};

OrgMembersList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      username: PropTypes.string,
      email: PropTypes.string,
      is_admin: PropTypes.bool,
      is_super_admin: PropTypes.bool,
    })
  ).isRequired,
  isLoading: PropTypes.bool,
};

export default OrgMembersList;
