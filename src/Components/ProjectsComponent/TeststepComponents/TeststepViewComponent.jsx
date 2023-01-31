import React from "react";
import { Accordion, Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";

import { AddButton } from "Components/forms/Buttons";
import TestdataAccordionItem from "./TestdataAccordionItem";
import { ViewComponent } from "Components/CustomComponents";

import { buildRoute } from "utils/helper";
import { convertToLocalDate } from "utils/convertToLocalDate";

import { EDIT_TESTSTEP_ROUTE } from "constants/routeConstants";

const TeststepViewComponent = ({
  data,
  projectName,
  testdata,
  onOpenTestdataForm,
}) => {
  const {
    id,
    name,
    method,
    endpoint,
    header,
    payload,
    created_at: createdAt,
    created_by: createdBy,
    modified_at: modifiedAt,
    modified_by: modifiedBy,
  } = data;

  const editTeststepLink = buildRoute(EDIT_TESTSTEP_ROUTE, { projectName, id });

  const onAddTestdata = () => onOpenTestdataForm();

  return (
    <div className="w-100">
      {/* TODO: improve naming convention for onEditLink */}
      <ViewComponent title={name} onEditLink={editTeststepLink}>
        <Row>
          <Col md={6} className="pb-4">
            <small>
              <b>Name</b>
            </small>
            <div>{name}</div>
          </Col>
          <Col md={6} className="pb-4">
            <small>
              <b>Method</b>
            </small>
            <div>{method}</div>
          </Col>
          <Col md={6} className="pb-4">
            <small>
              <b>Endpoint</b>
            </small>
            <div>{endpoint?.name}</div>
          </Col>
          <Col md={6} className="pb-4">
            <small>
              <b>Header</b>
            </small>
            <div>{header?.name}</div>
          </Col>
          <Col md={6} className="pb-4">
            <small>
              <b>Payload</b>
            </small>
            <div>{payload?.name}</div>
          </Col>
        </Row>
        <Row>
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

      <ViewComponent disabledHeader>
        <small>
          <b>TestData</b>
        </small>
        <Accordion>
          {testdata?.map((item, index) => (
            <TestdataAccordionItem
              eventKey={index}
              key={index}
              data={item}
              onEditButtonClick={onOpenTestdataForm}
            />
          ))}
        </Accordion>
        <div className="d-flex justify-content-center py-2">
          <AddButton size="sm" handleClick={onAddTestdata} />
        </div>
      </ViewComponent>
    </div>
  );
};

TeststepViewComponent.propTypes = {
  isLoading: PropTypes.bool,
  data: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    endpoint: PropTypes.shape({ name: PropTypes.string }).isRequired,
    header: PropTypes.shape({ name: PropTypes.string }).isRequired,
    payload: PropTypes.shape({ name: PropTypes.string }).isRequired,
    created_at: PropTypes.string,
    created_by: PropTypes.string,
    modified_at: PropTypes.string,
    modified_by: PropTypes.string,
  }).isRequired,
  projectName: PropTypes.string.isRequired,
  testdata: PropTypes.arrayOf(PropTypes.object).isRequired,
  onOpenTestdataForm: PropTypes.func.isRequired,
};

export default TeststepViewComponent;
