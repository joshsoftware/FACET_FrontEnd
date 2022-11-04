import React from "react";
import { Accordion, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { ViewComponent } from "Components/CustomComponents";

import { localDateTime } from "utils/helpers";

const TestsuiteViewComponent = ({ isLoading, data, projectName }) => {
  const {
    id: testsuiteId,
    name,
    testcases,
    created_at,
    created_by,
    modified_at,
    modified_by,
  } = data;

  return (
    !isLoading && (
      <div className="w-100">
        <ViewComponent
          title={name}
          onEditLink={`/project/${projectName}/testsuites/edit/${testsuiteId}`}
        >
          <Row>
            <Col md={6} className="py-2">
              <small>
                <b>Name</b>
              </small>
              <div>{name}</div>
            </Col>
            <Col md={12} className="py-2">
              <small>
                <b>Testcases</b>
              </small>
              <div>
                <Accordion>
                  {testcases?.map((item, index) => (
                    <Accordion.Item key={index}>
                      <Accordion.Header>{item.name}</Accordion.Header>
                      <Accordion.Body>
                        <Row>
                          <Col md={6} className="py-1">
                            <small>
                              <b>Teststeps ({testcases.length})</b>
                            </small>
                            <ul>
                              {item.teststeps?.map((teststep, ind) => (
                                <li key={ind}>
                                  <Link to={`/project/${projectName}/teststeps/${teststep.id}`}>
                                    {teststep.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </Col>
                        </Row>
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </div>
            </Col>
            <Col md={6} className="py-2">
              <small>
                <b>Created At</b>
              </small>
              <div>{localDateTime(created_at)}</div>
            </Col>
            <Col md={6} className="py-2">
              <small>
                <b>Created By</b>
              </small>
              <div>{created_by}</div>
            </Col>
            <Col md={6} className="py-2">
              <small>
                <b>Modified At</b>
              </small>
              <div>{localDateTime(modified_at)}</div>
            </Col>
            <Col md={6} className="py-2">
              <small>
                <b>Modified By</b>
              </small>
              <div>{modified_by}</div>
            </Col>
          </Row>
        </ViewComponent>
      </div>
    )
  );
};

TestsuiteViewComponent.propTypes = {
  data: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
  projectName: PropTypes.string.isRequired,
  environments: PropTypes.array,
  isEnvLoading: PropTypes.bool,
};

export default React.memo(TestsuiteViewComponent);
