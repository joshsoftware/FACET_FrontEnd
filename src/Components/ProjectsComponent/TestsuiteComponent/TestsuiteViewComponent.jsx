import React from "react";
import { Accordion, Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";

import ExecuteForm from "Components/ExecuteForm";
import TestcaseAccordionItem from "./TestcaseAccordionItem";
import { ViewComponent } from "Components/CustomComponents";

import { convertToLocalDate } from "utils/convertToLocalDate";

const TestsuiteViewComponent = ({
  data,
  projectName,
  environments,
  isEnvLoading,
  handleExecute,
  onEditButtonClick,
}) => {
  const {
    name,
    testcases,
    created_at: createdAt,
    created_by: createdBy,
    modified_at: modifiedAt,
    modified_by: modifiedBy,
  } = data;

  return (
    <div className="w-100">
      <ViewComponent title={name} onEdit={onEditButtonClick}>
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
                  <TestcaseAccordionItem
                    key={index}
                    item={item}
                    projectName={projectName}
                  />
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
      </ViewComponent>
      <ExecuteForm
        label="Testsuite"
        data={data}
        isEnvsLoading={isEnvLoading}
        environments={environments}
        handleExecute={handleExecute}
      />
    </div>
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
  projectName: PropTypes.string.isRequired,
  environments: PropTypes.array,
  isEnvLoading: PropTypes.bool,
  handleExecute: PropTypes.func.isRequired,
  onEditButtonClick: PropTypes.func.isRequired,
};

export default React.memo(TestsuiteViewComponent);
