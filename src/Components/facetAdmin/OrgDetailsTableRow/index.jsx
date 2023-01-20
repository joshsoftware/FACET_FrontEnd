import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { buildRoute } from "utils/helper";

import { ADMIN_ORG_DETAILS_ROUTE } from "constants/routeConstants";

const OrgDetailsTableRow = ({ data, index }) => {
  const { name, id, contact_email_id: email } = data;

  // helps to build admin org details link
  const orgDetailsLink = buildRoute(ADMIN_ORG_DETAILS_ROUTE, { id });

  return (
    <tr>
      <td>{index}</td>
      <td>
        <Link to={orgDetailsLink} className="text-decoration-none text-dark">
          {name}
        </Link>
      </td>
      <td>
        <Link to={orgDetailsLink} className="text-decoration-none text-dark">
          {id}
        </Link>
      </td>
      <td>{email}</td>
    </tr>
  );
};

OrgDetailsTableRow.propTypes = {
  index: PropTypes.number.isRequired,
  data: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    contact_email_id: PropTypes.string.isRequired,
  }).isRequired,
};

export default OrgDetailsTableRow;
