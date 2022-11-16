import React from "react";
import { Accordion } from "react-bootstrap";
import PropTypes from "prop-types";

import BadgeComponent from "Components/BadgeComponent";
import ViewComponent from "Components/CustomComponents/ViewComponent";

import ReportTeststepCard from "./ReportTeststepCard";
import ReportTestsuiteAccordion from "./ReportTestsuiteAccordion";

import PassFailBadges from "../PassFailBadges";

const ReportDetails = ({
  name,
  passedFields,
  failedFields,
  data,
  level,
  onTeststepCardClick,
}) => {
  const rightChildrens = (
    <div>
      <BadgeComponent bg="primary" label={level} className="text-capitalize" />
      <PassFailBadges passFields={passedFields} failFields={failedFields} />
    </div>
  );

  return (
    <ViewComponent disabledBtns title={name} rightChildrens={rightChildrens}>
      {level === "testcase" ? (
        data.map((item, index) => (
          <ReportTeststepCard
            key={index}
            data={item}
            level={level}
            onTeststepCardClick={onTeststepCardClick}
          />
        ))
      ) : (
        <Accordion>
          {data.map((suiteData, index) => (
            <ReportTestsuiteAccordion
              key={index}
              data={suiteData}
              level={level}
              onTeststepCardClick={onTeststepCardClick}
            />
          ))}
        </Accordion>
      )}
    </ViewComponent>
  );
};

ReportDetails.propTypes = {
  name: PropTypes.string.isRequired,
  passedFields: PropTypes.number.isRequired,
  failedFields: PropTypes.number.isRequired,
  data: PropTypes.array.isRequired,
  level: PropTypes.oneOf(["testcase", "testsuite"]).isRequired,
  onTeststepCardClick: PropTypes.func.isRequired,
};

export default ReportDetails;
