import React from "react";
import { Accordion, Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";

import ExecuteForm from "Components/ExecuteForm";
import TeststepAccordionItem from "./TeststepAccordionItem";
import { ViewComponent } from "Components/CustomComponents";

import { convertToLocalDate } from "utils/convertToLocalDate";

const TestcaseViewComponent = ({
  data,
  environments,
  isEnvironmentsLoading,
  handleExecute,
  onEditButtonClick,
}) => {
  const {
    name: testcaseName,
    description,
    teststeps,
    created_at: createdAt,
    created_by: createdBy,
    modified_at: modifiedAt,
    modified_by: modifiedBy,
  } = data;

  return (
    <div className="w-100">
      <ViewComponent title={testcaseName} onEdit={onEditButtonClick}>
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
                {teststeps?.map((item, index) => (
                  <TeststepAccordionItem key={index} item={item} />
                ))}
              </Accordion>
            </div>
          </Col>
          <Col md={6} className="py-2">
            <small>
              <b>Created At</b>
            </small>
            <div>{convertToLocalDate(createdAt)}</div>
          </Col>
          <Col md={6} className="py-2">
            <small>
              <b>Created By</b>
            </small>
            <div>{createdBy}</div>
          </Col>
          <Col md={6} className="py-2">
            <small>
              <b>Modified At</b>
            </small>
            <div>{convertToLocalDate(modifiedAt)}</div>
          </Col>
          <Col md={6} className="py-2">
            <small>
              <b>Modified By</b>
            </small>
            <div>{modifiedBy}</div>
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
  );
};

TestcaseViewComponent.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    teststeps: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    created_at: PropTypes.string.isRequired,
    created_by: PropTypes.string.isRequired,
    modified_at: PropTypes.string.isRequired,
    modified_by: PropTypes.string.isRequired,
  }).isRequired,
  projectName: PropTypes.string.isRequired,
  environments: PropTypes.array,
  isEnvironmentsLoading: PropTypes.bool,
  handleExecute: PropTypes.func.isRequired,
  onEditButtonClick: PropTypes.func.isRequired,
};

export default React.memo(TestcaseViewComponent);
