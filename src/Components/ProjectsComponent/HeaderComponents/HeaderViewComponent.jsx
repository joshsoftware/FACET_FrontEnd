import React from "react";
import { Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";

import { ViewComponent } from "Components/CustomComponents";
import TableComponent from "Components/CustomComponents/TableComponent";

import { convertToLocalDate } from "utils/convertToLocalDate";

const headerTableHeadings = ["#", "Property", "Value"];

const HeaderViewComponent = ({ data, onEditButtonClick }) => {
  const {
    name,
    header,
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
      </Row>
      <Row>
        <Col className="pb-4">
          <small>
            <b>Header</b>
          </small>
          <TableComponent striped bordered hover headings={headerTableHeadings}>
            {Object.entries(header || {}).map(([key, value], index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{key}</td>
                <td>{value}</td>
              </tr>
            ))}
          </TableComponent>
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

HeaderViewComponent.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    header: PropTypes.object.isRequired,
    created_at: PropTypes.string.isRequired,
    created_by: PropTypes.string.isRequired,
    modified_at: PropTypes.string.isRequired,
    modified_by: PropTypes.string.isRequired,
  }).isRequired,
  onEditButtonClick: PropTypes.func.isRequired,
};

export default HeaderViewComponent;
