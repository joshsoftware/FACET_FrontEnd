import React from "react";
import { Badge, Card } from "react-bootstrap";
import { BoxArrowUpRight } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ExecuteComponent = ({ isExecute, results, data, project, reportId }) => {
  const { name: itemName } = data;
  const resultInstance =
    results?.filter((res) => res.name === itemName)[0] || {};

  const {
    status,
    no_of_passed_fields: numOfPassedFields,
    no_of_failed_fields: numOfFailedFields,
  } = resultInstance;

  const accordionItemClass = (status) => {
    switch (status) {
      case "passed":
        return "border-success text-success";

      case "failed":
        return "border-danger text-danger";

      default:
        return "";
    }
  };

  const redirectToReportUrl = isExecute
    ? `/project/${project}/reports/${reportId}`
    : "";

  return (
    <Card className={accordionItemClass(status)} body>
      <Link
        to={redirectToReportUrl}
        className="text-decoration-none text-dark disabled-link"
      >
        <span>{itemName}</span>
        {isExecute && <BoxArrowUpRight className="mx-2" />}
      </Link>
      <Badge bg="success" className="mx-1">
        {numOfPassedFields} Pass
      </Badge>
      <Badge bg="danger">{numOfFailedFields} Fail</Badge>
    </Card>
  );
};

ExecuteComponent.propTypes = {
  results: PropTypes.array.isRequired,
  data: PropTypes.shape({ name: PropTypes.string.isRequired }).isRequired,
  project: PropTypes.string.isRequired,
  reportId: PropTypes.string.isRequired,
  isExecute: PropTypes.bool,
};

export default ExecuteComponent;
