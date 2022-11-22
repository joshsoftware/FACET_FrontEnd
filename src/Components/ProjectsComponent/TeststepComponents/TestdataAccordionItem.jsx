import React from "react";
import { Accordion, Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";

import JSONView from "Components/JSONView";
import TableComponent from "Components/CustomComponents/TableComponent";

import { jsonToString } from "utils/convertJson";

const parametersTableHeadings = ["Key", "Value"];
const expOutcomeTableHeadings = [
  "#",
  "Name",
  "Type",
  "isExact",
  "Value",
  "Validations",
];

const TestdataAccordionItem = ({ data }) => {
  const { name, parameters, payload, expected_outcome: expectedOutcome } = data;

  return (
    <Accordion.Item eventKey={name}>
      <Accordion.Header>{name}</Accordion.Header>
      <Accordion.Body>
        <Row>
          <Col md={6}>
            <div>
              <small>Parameters</small>
            </div>
            <TableComponent
              striped
              bordered
              size="sm"
              headings={parametersTableHeadings}
            >
              {Object.entries(parameters).map(([key, val], index) => {
                return (
                  <tr key={index}>
                    <td>{key}</td>
                    <td>{val}</td>
                  </tr>
                );
              })}
            </TableComponent>
          </Col>
          <Col md={6}>
            <div>
              <small>Payload</small>
            </div>
            <JSONView data={payload} />
          </Col>
          <Col md={12}>
            <div>
              <small>Expected Outcome</small>
            </div>
            <TableComponent striped bordered headings={expOutcomeTableHeadings}>
              {expectedOutcome?.map((itemData, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{itemData.name}</td>
                  <td>{itemData.type}</td>
                  <td>{itemData.isExact ? "Yes" : "No"}</td>
                  <td>{itemData.value || "-"}</td>
                  <td>
                    <pre className="mb-0">
                      {jsonToString(itemData?.validations, 2) ?? "-"}
                    </pre>
                  </td>
                </tr>
              ))}
            </TableComponent>
          </Col>
        </Row>
      </Accordion.Body>
    </Accordion.Item>
  );
};

TestdataAccordionItem.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    parameters: PropTypes.object.isRequired,
    payload: PropTypes.object.isRequired,
    expected_outcome: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        isExact: PropTypes.bool,
        value: PropTypes.any,
        validations: PropTypes.any,
      })
    ).isRequired,
  }).isRequired,
};

export default TestdataAccordionItem;
