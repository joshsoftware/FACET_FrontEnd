import React from "react";
import { Card } from "react-bootstrap";
import PropTypes from "prop-types";

import BadgeComponent from "Components/BadgeComponent";
import PassFailBadges from "Components/ProjectsComponent/PassFailBadges";

const ReportTeststepCard = ({
  data,
  testsuiteName,
  testcaseName,
  onTeststepCardClick,
}) => {
  const {
    name: teststepName,
    method,
    no_of_passed_testdata_combinations: passedFields,
    no_of_failed_testdata_combinations: failedFields,
  } = data;

  const handleClick = () => {
    onTeststepCardClick({ ...data, testsuiteName, testcaseName });
  };

  // If testName, passedFields,etc does not have value then it will return null
  // instead of render component
  if (
    !teststepName ||
    !method ||
    passedFields === undefined ||
    failedFields === undefined
  ) {
    return null;
  }

  return (
    <Card role="button" onClick={handleClick}>
      <Card.Body>
        <BadgeComponent bg="warning" label={method} className="me-2" />
        {teststepName}
        <PassFailBadges passFields={passedFields} failFields={failedFields} />
      </Card.Body>
    </Card>
  );
};

ReportTeststepCard.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    no_of_passed_testdata_combinations: PropTypes.number.isRequired,
    no_of_failed_testdata_combinations: PropTypes.number.isRequired,
  }).isRequired,
  testsuiteName: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  testcaseName: PropTypes.string.isRequired,
  onTeststepCardClick: PropTypes.func.isRequired,
};

export default ReportTeststepCard;
