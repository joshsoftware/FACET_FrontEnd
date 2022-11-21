import React from "react";
import { Accordion, Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";

const TeststepAccordionItem = ({ item }) => {
  const {
    name: teststepName,
    method,
    endpoint,
    header,
    payload,
    selected_testdata: selectedTestdata,
  } = item;

  return (
    <Accordion.Item eventKey={teststepName}>
      <Accordion.Header>{teststepName}</Accordion.Header>
      <Accordion.Body>
        <Row>
          <Col md={6} className="py-1">
            <small>
              <b>Method</b>
            </small>
            <div>{method}</div>
          </Col>
          <Col md={6} className="py-1">
            <small>
              <b>Endpoint</b>
            </small>
            <div>{endpoint?.name}</div>
          </Col>
          <Col md={6} className="py-1">
            <small>
              <b>Header</b>
            </small>
            <div>{header?.name}</div>
          </Col>
          <Col md={6} className="py-1">
            <small>
              <b>Payload</b>
            </small>
            <div>{payload?.name}</div>
          </Col>
          <Col className="py-1">
            <small>
              <b>No. Of Testdata</b>
            </small>
            <div>{selectedTestdata?.length}</div>
          </Col>
        </Row>
      </Accordion.Body>
    </Accordion.Item>
  );
};

TeststepAccordionItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    endpoint: PropTypes.shape({ name: PropTypes.string }).isRequired,
    header: PropTypes.shape({ name: PropTypes.string }).isRequired,
    payload: PropTypes.shape({ name: PropTypes.string }).isRequired,
    selected_testdata: PropTypes.array.isRequired,
  }).isRequired,
};

export default TeststepAccordionItem;
