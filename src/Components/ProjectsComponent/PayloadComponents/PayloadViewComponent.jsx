import React from "react";
import { Accordion, Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";

import JSONView from "Components/JSONView";
import { TableComponent } from "Components/CustomComponents";
import { ViewComponent } from "Components/CustomComponents";

import { convertToLocalDate } from "utils/convertToLocalDate";

const PayloadViewComponent = ({ data, onEditButtonClick }) => {
  const {
    name,
    parameters,
    payload,
    expected_outcome: expectedOutcome,
    created_at: createdAt,
    created_by: createdBy,
    modified_at: modifiedAt,
    modified_by: modifiedBy,
  } = data;

  return (
    <ViewComponent title={name} onEdit={onEditButtonClick}>
      <Row>
        <Col md={12} className="pb-4">
          <small>
            <b>Name</b>
          </small>
          <div>{name}</div>
        </Col>
        <Col md={6} className="pb-4">
          <small>
            <b>Parameters</b>
          </small>
          <TableComponent
            striped
            bordered
            size="sm"
            headings={["Key", "Value"]}
          >
            {Object.entries(parameters || {}).map(([key, val], index) => {
              return (
                <tr key={index}>
                  <td>{key}</td>
                  <td>{val}</td>
                </tr>
              );
            })}
          </TableComponent>
        </Col>
        <Col md={6} className="pb-4">
          <small>
            <b>Payload</b>
          </small>
          <JSONView data={payload} />
        </Col>
        <Col md={12} className="pb-4">
          <small>
            <b>Expected Outcome</b>
          </small>
          <Accordion>
            {expectedOutcome?.map((item, ind) => {
              return (
                <Accordion.Item key={ind} eventKey={ind}>
                  <Accordion.Header>{item.name}</Accordion.Header>
                  <Accordion.Body>
                    <TableComponent
                      striped
                      bordered
                      headings={[
                        "#",
                        "Name",
                        "Type",
                        "isExact",
                        "Value",
                        "Validations",
                      ]}
                    >
                      {item?.expected_outcome?.map((itemData, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{itemData.name}</td>
                            <td>{itemData.type}</td>
                            <td>{itemData.isExact ? "Yes" : "No"}</td>
                            <td>{itemData.value || "-"}</td>
                            <td>
                              <pre className="mb-0">
                                {JSON.stringify(
                                  itemData.validations,
                                  null,
                                  2
                                ) || "-"}
                              </pre>
                            </td>
                          </tr>
                        );
                      })}
                    </TableComponent>
                  </Accordion.Body>
                </Accordion.Item>
              );
            })}
          </Accordion>
        </Col>
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
  );
};

PayloadViewComponent.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    parameters: PropTypes.object.isRequired,
    payload: PropTypes.object.isRequired,
    expected_outcome: PropTypes.array.isRequired,
    created_at: PropTypes.string.isRequired,
    created_by: PropTypes.string.isRequired,
    modified_at: PropTypes.string.isRequired,
    modified_by: PropTypes.string.isRequired,
  }).isRequired,
  onEditButtonClick: PropTypes.func.isRequired,
};

export default PayloadViewComponent;
