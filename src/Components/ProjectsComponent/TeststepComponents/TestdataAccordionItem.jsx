import React from "react";
import { Accordion, Col, Row } from "react-bootstrap";
import { PencilSquare } from "react-bootstrap-icons";
import PropTypes from "prop-types";

import JSONView from "Components/JSONView";
import TableComponent from "Components/CustomComponents/TableComponent";

import {
  EXPECTED_OUTCOME_TABLE_HEADINGS,
  PARAMETERS_TABLE_HEADINGS,
} from "constants/appConstants";

const TestdataAccordionItem = ({ eventKey, data, onEditButtonClick }) => {
  const { name, parameters, payload, expected_outcome: expectedOutcome } = data;

  const handleEditTestdata = () => onEditButtonClick(data);

  return (
    <Accordion.Item eventKey={eventKey}>
      <Accordion.Header>
        <div className="w-100 d-flex justify-content-between">
          {name}
          <PencilSquare className="me-3" onClick={handleEditTestdata} />
        </div>
      </Accordion.Header>
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
              headings={PARAMETERS_TABLE_HEADINGS}
            >
              {Object.entries(parameters).map(([key, val], ind) => (
                <tr key={ind}>
                  <td>{key}</td>
                  <td>{val}</td>
                </tr>
              ))}
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
            <TableComponent
              striped
              bordered
              headings={EXPECTED_OUTCOME_TABLE_HEADINGS}
            >
              {expectedOutcome?.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.type}</td>
                  <td>{item.isExact ? "Yes" : "No"}</td>
                  <td>{item.value || "-"}</td>
                  <td>
                    <pre className="mb-0">
                      {JSON.stringify(item.validations, null, 2) || "-"}
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
  eventKey: PropTypes.any,
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    parameters: PropTypes.object.isRequired,
    payload: PropTypes.object.isRequired,
    expected_outcome: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  onEditButtonClick: PropTypes.func.isRequired,
};

export default TestdataAccordionItem;
