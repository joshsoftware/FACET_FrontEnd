import React from "react";
import { Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";

import { ViewComponent } from "Components/CustomComponents";

import { convertToLocalDate } from "utils/convertToLocalDate";

const EnvironmentViewComponent = ({ data, onEditButtonClick }) => {
  const {
    name,
    url,
    created_at: createdAt,
    created_by: createdBy,
    modified_at: modifiedAt,
    modified_by: modifiedBy,
  } = data;

  return (
    <ViewComponent title={name} onEdit={onEditButtonClick}>
      <Row>
        <Col className="pb-4">
          <small>
            <b>Name</b>
          </small>
          <div>{name}</div>
        </Col>
        <Col className="pb-4">
          <small>
            <b>URL</b>
          </small>
          <div>{url}</div>
        </Col>
      </Row>
      <Row>
        <Col className="pb-4">
          <small>
            <b>Created At</b>
          </small>
          <div>{convertToLocalDate(createdAt)}</div>
        </Col>
        <Col className="pb-4">
          <small>
            <b>Created By</b>
          </small>
          <div>{createdBy}</div>
        </Col>
      </Row>
      <Row>
        <Col className="pb-4">
          <small>
            <b>Modified At</b>
          </small>
          <div>{convertToLocalDate(modifiedAt)}</div>
        </Col>
        <Col className="pb-4">
          <small>
            <b>Modified By</b>
          </small>
          <div>{modifiedBy}</div>
        </Col>
      </Row>
    </ViewComponent>
  );
};

EnvironmentViewComponent.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    created_by: PropTypes.string.isRequired,
    modified_at: PropTypes.string.isRequired,
    modified_by: PropTypes.string.isRequired,
  }).isRequired,
  onEditButtonClick: PropTypes.func.isRequired,
};

export default EnvironmentViewComponent;
