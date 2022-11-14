import React from "react";
import { Accordion, Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";

import ExecuteForm from "Components/ExecuteForm";
import { ViewComponent } from "Components/CustomComponents";

import { convertToLocalDate } from "utils/convertToLocalDate";

const TestcaseViewComponent = ({
  isLoading,
  data,
  projectName,
  environments,
  isEnvironmentsLoading,
  handleExecute,
}) => {
  const {
    id: testcaseId,
    name: testcaseName,
    description,
    teststeps,
    created_at,
    created_by,
    modified_at,
    modified_by,
  } = data;
  return (
    !isLoading && (
      <div className="w-100">
        <ViewComponent
          title={testcaseName}
          onEditLink={`/project/${projectName}/testcases/edit/${testcaseId}`}
        >
          <Row>
            <Col md={6} className="py-2">
              <small>
                <b>Name</b>
              </small>
              <div>{testcaseName}</div>
            </Col>
            <Col md={6} className="py-2">
              <small>
                <b>Description</b>
              </small>
              <div>{description || "-"}</div>
            </Col>
            <Col md={12} className="py-2">
              <small>
                <b>Teststeps</b>
              </small>
              <div>
                <Accordion>
                  {teststeps?.map((item, index) => {
                    const {
                      name: teststepName,
                      method,
                      endpoint,
                      header,
                      payload,
                      selected_testdata: selectedTestdata,
                    } = item;
                    return (
                      <Accordion.Item key={index} eventKey={index}>
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
                  })}
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
          <div className="d-flex"></div>
        </ViewComponent>
        <ExecuteForm
          label="Testcase"
          data={data}
          environments={environments}
          isEnvsLoading={isEnvironmentsLoading}
          handleExecute={handleExecute}
        />
      </div>
    )
  );
};

TestcaseViewComponent.propTypes = {
  data: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
  projectName: PropTypes.string.isRequired,
  environments: PropTypes.array,
  isEnvironmentsLoading: PropTypes.bool,
  handleExecute: PropTypes.func.isRequired,
};

export default React.memo(TestcaseViewComponent);
