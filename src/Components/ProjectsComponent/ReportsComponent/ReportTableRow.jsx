import React from "react";
import { EyeFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import BadgeComponent from "Components/BadgeComponent";

import { convertToLocalDate } from "utils/convertToLocalDate";
import { getReportDetails } from "utils/reportsHelper";

const ReportTableRow = ({ data, projectName }) => {
  const {
    id,
    level,
    status,
    executed_by: { name: executedBy },
    executed_on: executedOn,
    result,
  } = data;
  const { name } = getReportDetails(level, result);
  const redirectToReport = `/project/${projectName}/reports/${id}`;
  const statusColor = status === "passed" ? "success" : "danger";

  return (
    <tr>
      <td>
        <Link to={redirectToReport} className="text-decoration-none text-dark">
          {id}
        </Link>
      </td>
      <td>
        <Link to={redirectToReport} className="text-decoration-none text-dark">
          {name}
        </Link>
      </td>
      <td className="text-capitalize">{level}</td>
      <td className="text-capitalize">
        <BadgeComponent bg={statusColor} label={status} />
      </td>
      <td className="text-capitalize">{executedBy}</td>
      <td>{convertToLocalDate(executedOn)}</td>
      <td>
        <Link to={redirectToReport} className="text-secondary">
          <EyeFill />
        </Link>
      </td>
    </tr>
  );
};

ReportTableRow.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    level: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    executed_by: PropTypes.shape({ name: PropTypes.string.isRequired })
      .isRequired,
    executed_on: PropTypes.string.isRequired,
    result: PropTypes.object.isRequired,
  }).isRequired,
  projectName: PropTypes.string.isRequired,
};

export default ReportTableRow;
