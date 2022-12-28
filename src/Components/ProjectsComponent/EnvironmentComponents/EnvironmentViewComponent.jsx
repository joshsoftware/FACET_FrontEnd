import React from "react";
import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";

import { ViewComponent } from "Components/CustomComponents";

const EnvironmentViewComponent = (props) => {
  const { data, isLoading, projectName } = props;

  return (
    !isLoading &&
    data && (
      <ViewComponent
        title={data.name}
        onEditLink={`/project/${projectName}/environments/edit/${data.id}`}
      >
        <Row>
          <Col className="pb-4">
            <small>
              <b>Name</b>
            </small>
            <div>{data.name}</div>
          </Col>
          <Col className="pb-4">
            <small>
              <b>URL</b>
            </small>
            <div>{data.url}</div>
          </Col>
        </Row>
        <Row>
          <Col className="pb-4">
            <small>
              <b>Created At</b>
            </small>
            <div>{new Date(data.created_at).toLocaleString()}</div>
          </Col>
          <Col className="pb-4">
            <small>
              <b>Created By</b>
            </small>
            <div>{data.created_by}</div>
          </Col>
        </Row>
        <Row>
          <Col className="pb-4">
            <small>
              <b>Modified At</b>
            </small>
            <div>{new Date(data.modified_at).toLocaleString()}</div>
          </Col>
          <Col className="pb-4">
            <small>
              <b>Modified By</b>
            </small>
            <div>{data.modified_by}</div>
          </Col>
        </Row>
      </ViewComponent>
    )
  );
};

export default EnvironmentViewComponent;

EnvironmentViewComponent.propTypes = {
  data: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
  projectName: PropTypes.string.isRequired,
};
