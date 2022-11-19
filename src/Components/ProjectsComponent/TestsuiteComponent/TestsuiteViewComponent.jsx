import React from "react";
import { Accordion, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import ExecuteForm from "Components/ExecuteForm";
import { ViewComponent } from "Components/CustomComponents";

import { convertToLocalDate } from "utils/convertToLocalDate";

const TestsuiteViewComponent = ({
  isLoading,
  data,
  projectName,
  environments,
  isEnvLoading,
  handleExecute,
}) => {
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
                    <Accordion.Item key={index} eventKey={index}>
                      <Accordion.Header>{item.name}</Accordion.Header>
                      <Accordion.Body>
                        <Row>
                          <Col md={6} className="py-1">
                            <small>
                              <b>Teststeps ({item.teststeps?.length})</b>
                            </small>
                            <ul>
                              {item.teststeps?.map((teststep, ind) => (
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
                  ))}
                </Accordion>
              </div>
            </Col>
            <Col md={6} className="py-2">
              <small>
                <b>Created At</b>
              </small>
              <div>{convertToLocalDate(created_at)}</div>
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
              <div>{convertToLocalDate(modified_at)}</div>
            </Col>
            <Col md={6} className="py-2">
              <small>
                <b>Modified By</b>
              </small>
              <div>{modified_by}</div>
            </Col>
          </Row>
        </ViewComponent>
        <ExecuteForm
          label="Testsuite"
          data={data}
          isEnvsLoading={isEnvLoading}
          environments={environments}
          handleExecute={handleExecute}
        />
      </div>
    )
  );
};

TestsuiteViewComponent.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    testcases: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    created_at: PropTypes.string.isRequired,
    created_by: PropTypes.string.isRequired,
    modified_at: PropTypes.string.isRequired,
    modified_by: PropTypes.string.isRequired,
  }).isRequired,
  isLoading: PropTypes.bool,
  projectName: PropTypes.string.isRequired,
  environments: PropTypes.array,
  isEnvLoading: PropTypes.bool,
  handleExecute: PropTypes.func.isRequired,
};

export default React.memo(TestsuiteViewComponent);
