import React from "react";
import { Accordion, Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";

import { AddButton } from "Components/forms/Buttons";
import AddNewTestdata from "./AddNewTestdata";
import DownloadButton from "Components/forms/Buttons/DownloadButton";
import TestdataAccordionItem from "./TestdataAccordionItem";
import UploadButton from "Components/forms/Buttons/UploadButton";
import ViewComponent from "Components/CustomComponents/ViewComponent";

import { convertToLocalDate } from "utils/convertToLocalDate";

const TeststepViewComponent = ({
  data,
  projectName,
  testdata,
  showAddTestdataForm,
  toggleAddTestdataForm,
  testdataFormData,
  onTestdataFormChange,
  onTestdataFormSubmit,
  onDownloadTestdataExcel,
  onUploadTestdataExcel,
}) => {
  const {
    id: teststepId,
    name: teststepName,
    method,
    endpoint,
    header,
    payload,
    created_at: createdAt,
    created_by: createdBy,
    modified_at: modifiedAt,
    modified_by: modifiedBy,
  } = data;

  const editTeststepLink = `/project/${projectName}/teststeps/edit/${teststepId}`;

  return (
    <div className="w-100">
      <ViewComponent title={teststepName} onEditLink={editTeststepLink}>
        <Row>
          <Col md={6} className="pb-4">
            <small>
              <b>Name</b>
            </small>
            <div>{teststepName}</div>
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
        <div className="d-flex justify-content-between align-items-center mb-2">
          <small>
            <b>TestData</b>
          </small>
          <div className="d-flex">
            <UploadButton onClick={onUploadTestdataExcel} />
            <DownloadButton
              className="ms-1"
              onClick={onDownloadTestdataExcel}
            />
          </div>
        </div>
        <Accordion>
          {testdata?.map((item, index) => (
            <TestdataAccordionItem data={item} key={index} />
          ))}
        </Accordion>
        {showAddTestdataForm ? (
          <AddNewTestdata
            data={testdataFormData}
            onChange={onTestdataFormChange}
            onSubmit={onTestdataFormSubmit}
            handleClose={toggleAddTestdataForm}
          />
        ) : (
          <div className="d-flex justify-content-center py-2">
            <AddButton size="sm" handleClick={toggleAddTestdataForm} />
          </div>
        )}
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
    endpoint: PropTypes.object.isRequired,
    header: PropTypes.object.isRequired,
    payload: PropTypes.object.isRequired,
    created_at: PropTypes.string.isRequired,
    created_by: PropTypes.string.isRequired,
    modified_at: PropTypes.string.isRequired,
    modified_by: PropTypes.string.isRequired,
  }).isRequired,
  projectName: PropTypes.string.isRequired,
  testdata: PropTypes.array.isRequired,
  showAddTestdataForm: PropTypes.bool,
  toggleAddTestdataForm: PropTypes.func.isRequired,
  testdataFormData: PropTypes.object.isRequired,
  onTestdataFormChange: PropTypes.func.isRequired,
  onTestdataFormSubmit: PropTypes.func.isRequired,
  onDownloadTestdataExcel: PropTypes.func.isRequired,
  onUploadTestdataExcel: PropTypes.func.isRequired,
};

export default TeststepViewComponent;
