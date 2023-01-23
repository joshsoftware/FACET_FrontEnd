import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { buildRoute } from "utils/helper";

import { ADMIN_ORG_DETAILS_ROUTE } from "constants/routeConstants";

const UserTableRow = ({ data, index }) => {
  const {
    name,
    username,
    user_organization: { name: orgName, id: orgId },
    account_type: accountType,
  } = data;

  const orgDetailsRoute = buildRoute(ADMIN_ORG_DETAILS_ROUTE, { id: orgId });

  return (
    <tr className="align-middle">
      <td>{index}</td>
      <td>
        <div>{name}</div>
        <small className="text-muted">{username}</small>
      </td>
      <td className="text-capitalize">{accountType}</td>
      <td>
        <Link to={orgDetailsRoute} className="text-dark text-decoration-none">
          {orgName}
        </Link>
      </td>
    </tr>
  );
};

UserTableRow.propTypes = {
  index: PropTypes.number.isRequired,
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    user_organization: PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }).isRequired,
    account_type: PropTypes.string.isRequired,
  }).isRequired,
};

export default UserTableRow;
