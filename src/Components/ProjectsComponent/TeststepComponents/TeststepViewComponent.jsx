import React from 'react';
import PropTypes from 'prop-types';
import { Accordion, Col, Row } from 'react-bootstrap';

import { ViewComponent } from 'Components/CustomComponents';
import { AddButton } from 'Components/forms/Buttons';
import JSONView from 'Components/JSONView';
import AddNewTestdata from './AddNewTestdata';
import TableComponent from 'Components/CustomComponents/TableComponent/index';

const TeststepViewComponent = (props) => {
  const {
    isLoading,
    data,
    projectName,
    testdata,
    showAddTestdataForm,
    toggleAddTestdataForm,
    testdataFormData,
    onTestdataFormChange,
    onTestdataFormSubmit,
  } = props;

  return (
    !isLoading &&
    typeof data === 'object' &&
    Object.entries(data).length && (
      <div className="w-100">
        <ViewComponent
          title={data.name}
          onEditLink={`/project/${projectName}/teststeps/edit/${data.id}`}>
          <Row>
            <Col md={6} className="pb-4">
              <small>
                <b>Name</b>
              </small>
              <div>{data.name}</div>
            </Col>
            <Col md={6} className="pb-4">
              <small>
                <b>Method</b>
              </small>
              <div>{data.method}</div>
            </Col>
            <Col md={6} className="pb-4">
              <small>
                <b>Endpoint</b>
              </small>
              <div>{data.endpoint.name}</div>
            </Col>
            <Col md={6} className="pb-4">
              <small>
                <b>Header</b>
              </small>
              <div>{data.header.name}</div>
            </Col>
            <Col md={6} className="pb-4">
              <small>
                <b>Payload</b>
              </small>
              <div>{data.payload.name}</div>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="pb-4">
              <small>
                <b>Created At</b>
              </small>
              <div>{new Date(data.created_at).toLocaleString()}</div>
            </Col>
            <Col md={6} className="pb-4">
              <small>
                <b>Created By</b>
              </small>
              <div>{data.created_by}</div>
            </Col>
            <Col md={6} className="pb-4">
              <small>
                <b>Modified At</b>
              </small>
              <div>{new Date(data.modified_at).toLocaleString()}</div>
            </Col>
            <Col md={6} className="pb-4">
              <small>
                <b>Modified By</b>
              </small>
              <div>{data.modified_by}</div>
            </Col>
          </Row>
        </ViewComponent>

        <ViewComponent disabledHeader>
          <small>
            <b>TestData</b>
          </small>
          <Accordion>
            {testdata?.map((item, index) => {
              return (
                <Accordion.Item key={index} eventKey={index}>
                  <Accordion.Header>{item.name}</Accordion.Header>
                  <Accordion.Body>
                    <Row>
                      <Col md={6}>
                        <div>
                          <small>Parameters</small>
                        </div>
                        <TableComponent striped bordered size="sm" headings={['Key', 'Value']}>
                          {Object.entries(item?.parameters).map(([key, val], ind) => {
                            return (
                              <tr key={ind}>
                                <td>{key}</td>
                                <td>{val}</td>
                              </tr>
                            );
                          })}
                        </TableComponent>
                      </Col>
                      <Col md={6}>
                        <div>
                          <small>Payload</small>
                        </div>
                        <JSONView data={item.payload} />
                      </Col>
                      <Col md={12}>
                        <div>
                          <small>Expected Outcome</small>
                        </div>
                        <TableComponent
                          striped
                          bordered
                          headings={['#', 'Name', 'Type', 'isExact', 'Value', 'Validations']}>
                          {item?.expected_outcome?.map((itemData, index) => {
                            return (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{itemData.name}</td>
                                <td>{itemData.type}</td>
                                <td>{itemData.isExact ? 'Yes' : 'No'}</td>
                                <td>{itemData.value || '-'}</td>
                                <td>
                                  <pre className="mb-0">
                                    {JSON.stringify(itemData.validations, null, 2) || '-'}
                                  </pre>
                                </td>
                              </tr>
                            );
                          })}
                        </TableComponent>
                      </Col>
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
              );
            })}
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
    )
  );
};

TeststepViewComponent.propTypes = {
  isLoading: PropTypes.bool,
  data: PropTypes.object,
  projectName: PropTypes.string,
  testdata: PropTypes.array,
  showAddTestdataForm: PropTypes.bool,
  toggleAddTestdataForm: PropTypes.func,
  testdataFormData: PropTypes.object,
  onTestdataFormChange: PropTypes.func,
  onTestdataFormSubmit: PropTypes.func,
};

export default TeststepViewComponent;
