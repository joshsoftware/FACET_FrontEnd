import React from "react";
import { Accordion } from "react-bootstrap";
import PropTypes from "prop-types";

import PassFailBadges from "Components/ProjectsComponent/PassFailBadges";
import ReportTeststepCard from "./ReportTeststepCard";

import { captitalFiretLetter, componentMissingErrors } from "utils/helper";

const ReportTestsuiteAccordion = ({ data, level, testsuiteName, onTeststepCardClick }) => {
  const {
    testcase,
    teststeps,
    status,
    no_of_passed_teststeps: passedCases,
    no_of_failed_teststeps: failedCases,
  } = data;

  const isError = status === "aborted" || !Array.isArray(teststeps);

  return (
    <Accordion.Item eventKey={testcase.name}>
      <Accordion.Header>
        {testcase.name}
        <PassFailBadges passFields={passedCases} failFields={failedCases} />
      </Accordion.Header>
      <Accordion.Body>
        {isError ? (
          <div>
            {captitalFiretLetter(componentMissingErrors(teststeps?.error))}
          </div>
        ) : (
          teststeps?.map((item, key) => (
            <ReportTeststepCard
              key={key}
              data={item}
              level={level}
              testsuiteName={testsuiteName}
              testcaseName={testcase?.name}
              onTeststepCardClick={onTeststepCardClick}
            />
          ))
        )}
      </Accordion.Body>
    </Accordion.Item>
  );
};

ReportTestsuiteAccordion.propTypes = {
  data: PropTypes.object.isRequired,
  level: PropTypes.oneOf(["testcase", "testsuite"]).isRequired,
  testsuiteName: PropTypes.string.isRequired,
  onTeststepCardClick: PropTypes.func.isRequired,
};

export default ReportTestsuiteAccordion;
