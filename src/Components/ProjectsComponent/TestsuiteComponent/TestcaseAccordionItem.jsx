import React from "react";
import { Accordion, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const TestcaseAccordionItem = ({ item, projectName }) => {
  const { name, teststeps } = item;

  return (
    <Accordion.Item eventKey={name}>
      <Accordion.Header>{name}</Accordion.Header>
      <Accordion.Body>
        <Row>
          <Col md={6} className="py-1">
            <small>
              <b>Teststeps ({teststeps?.length})</b>
            </small>
            <ul>
              {teststeps?.map((teststep, ind) => (
                <li key={ind}>
                  <Link
                    to={`/project/${projectName}/teststeps/${teststep.id}`}
                    className="text-decoration-none text-dark"
                  >
                    {teststep.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>
        </Row>
      </Accordion.Body>
    </Accordion.Item>
  );
};

TestcaseAccordionItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    teststeps: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  projectName: PropTypes.string.isRequired,
};

export default TestcaseAccordionItem;
