import React from "react";
import { Accordion, Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";

import ExpOutcomeAccordionItem from "./ExpOutcomeAccordionItem";
import JSONView from "Components/JSONView";
import { TableComponent } from "Components/CustomComponents";
import { ViewComponent } from "Components/CustomComponents";

import { convertToLocalDate } from "utils/convertToLocalDate";

import { PARAMETERS_TABLE_HEADINGS } from "constants/appConstants";

const PayloadViewComponent = ({ data, onEditButtonClick }) => {
  const {
    name,
    parameters,
    payload,
    expected_outcome: expectedOutcome,
    created_at: createdAt,
    created_by: createdBy,
    modified_at: modifiedAt,
    modified_by: modifiedBy,
  } = data;

  return (
    <ViewComponent title={name} onEdit={onEditButtonClick}>
      <Row>
        <Col md={12} className="pb-4">
          <small>
            <b>Name</b>
          </small>
          <div>{name}</div>
        </Col>
        <Col md={6} className="pb-4">
          <small>
            <b>Parameters</b>
          </small>
          <TableComponent
            striped
            bordered
            size="sm"
            headings={PARAMETERS_TABLE_HEADINGS}
          >
            {Object.entries(parameters || {}).map(([key, val], index) => (
              <tr key={index}>
                <td>{key}</td>
                <td>{val}</td>
              </tr>
            ))}
          </TableComponent>
        </Col>
        <Col md={6} className="pb-4">
          <small>
            <b>Payload</b>
          </small>
          <JSONView data={payload} />
        </Col>
        <Col md={12} className="pb-4">
          <small>
            <b>Expected Outcome</b>
          </small>
          <Accordion>
            {expectedOutcome?.map((item, ind) => (
              <ExpOutcomeAccordionItem key={ind} item={item} eventKey={ind} />
            ))}
          </Accordion>
        </Col>
        <Col md={6} className="pb-4">
          <small>
            <b>Created At</b>
          </small>
          <div>{convertToLocalDate(createdAt)}</div>
        </Col>
        <Col md={6} className="pb-4">
          <small>
            <b>Created By</b>
          </small>
          <div>{createdBy}</div>
        </Col>
        <Col md={6} className="pb-4">
          <small>
            <b>Modified At</b>
          </small>
          <div>{convertToLocalDate(modifiedAt)}</div>
        </Col>
        <Col md={6} className="pb-4">
          <small>
            <b>Modified By</b>
          </small>
          <div>{modifiedBy}</div>
        </Col>
      </Row>
    </ViewComponent>
  );
};

PayloadViewComponent.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    parameters: PropTypes.object.isRequired,
    payload: PropTypes.object.isRequired,
    expected_outcome: PropTypes.array.isRequired,
    created_at: PropTypes.string.isRequired,
    created_by: PropTypes.string.isRequired,
    modified_at: PropTypes.string.isRequired,
    modified_by: PropTypes.string.isRequired,
  }).isRequired,
  onEditButtonClick: PropTypes.func.isRequired,
};

export default PayloadViewComponent;
