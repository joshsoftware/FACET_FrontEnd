import React from "react";
import { Card } from "react-bootstrap";
import PropType from "prop-types";

import BadgeComponent from "Components/BadgeComponent";

import PassFailBadges from "../PassFailBadges";

const ReportTeststepCard = ({ data, onTeststepCardClick }) => {
  const {
    name: teststepName,
    method,
    no_of_passed_testdata_combinations: passedFields,
    no_of_failed_testdata_combinations: failedFields,
  } = data;

  const handleClick = () => {
    onTeststepCardClick(data);
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
  data: PropType.object.isRequired,
  onTeststepCardClick: PropType.func.isRequired,
};

export default ReportTeststepCard;
