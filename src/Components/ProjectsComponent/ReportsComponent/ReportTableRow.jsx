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
    executed_by: { name: executedBy },
    executed_on: executedOn,
    result,
  } = data;
  const { name, passedFields, failedFields } = getReportDetails(level, result);
  const redirectToReport = `/project/${projectName}/reports/${id}`;

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
      <td>
        <BadgeComponent bg="success" label={passedFields} />
      </td>
      <td>
        <BadgeComponent bg="danger" label={failedFields} />
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
  data: PropTypes.object.isRequired,
  projectName: PropTypes.string.isRequired,
};

export default ReportTableRow;
