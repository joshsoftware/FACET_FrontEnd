import React from "react";
import { Accordion, Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";

import JSONView from "Components/JSONView";
import PassFailBadges from "Components/ProjectsComponent/PassFailBadges";
import TestdataReportDetails from "./TestdataReportDetails";
import ViewComponent from "Components/CustomComponents/ViewComponent";

const TeststepReportDetails = ({ data }) => {
  const {
    name,
    endpoint,
    header,
    no_of_failed_testdata_combinations: failedFields,
    no_of_passed_testdata_combinations: passedFields,
    testdata_combinations: testdata,
  } = data;

  const rightChildrens = (
    <div>
      <PassFailBadges passFields={passedFields} failFields={failedFields} />
    </div>
  );

  return (
    <ViewComponent disabledBtns title={name} rightChildrens={rightChildrens}>
      <Row>
        <Col md={6}>
          <small>
            <b>Endpoint</b>
          </small>
          <div>{endpoint}</div>
        </Col>
        <Col md={6}>
          <small>
            <b>Header</b>
          </small>
          <JSONView data={header} />
        </Col>
      </Row>
      <div>
        <small>
          <b>Testdata Combinations</b>
        </small>
        <Accordion>
          {testdata?.map((item, index) => (
            <TestdataReportDetails data={item} key={index} />
          ))}
        </Accordion>
      </div>
    </ViewComponent>
  );
};

TeststepReportDetails.propTypes = {
  data: PropTypes.object.isRequired,
};

export default TeststepReportDetails;
