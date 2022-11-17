import React from "react";
import { Accordion, Tab, Tabs } from "react-bootstrap";
import PropTypes from "prop-types";

import JSONView from "Components/JSONView";
import TableComponent from "Components/CustomComponents/TableComponent";
import TestdataOutcomeTable from "./TestdataOutcomeTable";

const parametersTableHeadings = ["Key", "Value"];

const TestdataReportDetails = ({ data }) => {
  const { name, status, parameters, payload, response, outcome } = data;

  const testdataAccordionClass = `border-${
    status === "passed" ? "success" : "danger"
  }`;

  return (
    <Accordion.Item eventKey={name} className={testdataAccordionClass}>
      <Accordion.Header>{name}</Accordion.Header>
      <Accordion.Body>
        <Tabs defaultActiveKey="outcome">
          <Tab eventKey="parameters" title="Parameters">
            <TableComponent striped bordered headings={parametersTableHeadings}>
              {Object.entries(parameters).map(([key, value], index) => (
                <tr key={index}>
                  <td>{key}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </TableComponent>
          </Tab>
          <Tab eventKey="payload" title="Payload">
            <JSONView data={payload} />
          </Tab>
          <Tab eventKey="outcome" title="Outcome">
            <TestdataOutcomeTable data={outcome} />
          </Tab>
          <Tab eventKey="response" title="Response">
            <JSONView data={response} />
          </Tab>
        </Tabs>
      </Accordion.Body>
    </Accordion.Item>
  );
};

TestdataReportDetails.propTypes = {
  data: PropTypes.object.isRequired,
};

export default TestdataReportDetails;
