import React from 'react';
import PropTypes from 'prop-types';
import { Accordion, Col, Row } from 'react-bootstrap';

import { ViewComponent } from 'Components/CustomComponents';
import ExecuteTestsuiteForm from './ExecuteTestsuiteForm';

const TestcaseViewComponent = (props) => {
    const { 
        isLoading, 
        data, 
        projectName, 
        environments, 
        isEnvironmentsLoading, 
        handleExecute
    } = props;

    return !isLoading && typeof(data)==='object' && Object.entries(data).length!==0 &&(
        <div className='w-100'>
            <ViewComponent 
                title={data.name}
                onEditLink={`/project/${projectName}/testcases/edit/${data.id}`}
            >
                <Row>
                    <Col md={6} className='py-2'>
                        <small><b>Name</b></small>
                        <div>{data.name}</div>
                    </Col>
                    <Col md={6} className='py-2'>
                        <small><b>Description</b></small>
                        <div>{data.description || '-'}</div>
                    </Col>
                    <Col md={12} className='py-2'>
                        <small><b>Teststeps</b></small>
                        <div>
                            <Accordion>
                                {data?.teststeps?.map((item, index) => {
                                    return (
                                        <Accordion.Item key={index} eventKey={index}>
                                            <Accordion.Header>
                                                {item.name}
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                <Row>
                                                    <Col md={6} className='py-1'>
                                                        <small><b>Method</b></small>
                                                        <div>{item.method}</div>
                                                    </Col>
                                                    <Col md={6} className='py-1'>
                                                        <small><b>Endpoint</b></small>
                                                        <div>{item.endpoint.name}</div>
                                                    </Col>
                                                    <Col md={6} className='py-1'>
                                                        <small><b>Header</b></small>
                                                        <div>{item.header.name}</div>
                                                    </Col>
                                                    <Col md={6} className='py-1'>
                                                        <small><b>Payload</b></small>
                                                        <div>{item.payload.name}</div>
                                                    </Col>
                                                    <Col className='py-1'>
                                                        <small><b>No. Of Testdata</b></small>
                                                        <div>{data?.testdatas?.length}</div>
                                                    </Col>
                                                </Row>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    )
                                })}
                            </Accordion>
                        </div>
                    </Col>
                    <Col md={6} className='py-2'>
                        <small><b>Created At</b></small>
                        <div>{new Date(data.created_at).toLocaleString()}</div>
                    </Col>
                    <Col md={6} className='py-2'>
                        <small><b>Created By</b></small>
                        <div>{data.created_by}</div>
                    </Col>
                    <Col md={6} className='py-2'>
                        <small><b>Modified At</b></small>
                        <div>{new Date(data.modified_at).toLocaleString()}</div>
                    </Col>
                    <Col md={6} className='py-2'>
                        <small><b>Modified By</b></small>
                        <div>{data.modified_by}</div>
                    </Col>
                </Row>
                <div className='d-flex'>
                </div>
            </ViewComponent>
            <ExecuteTestsuiteForm 
                data={data}
                environments={environments}
                isEnvironmentsLoading={isEnvironmentsLoading}
                handleExecute={handleExecute}
            />
        </div>
    )
}

export default TestcaseViewComponent;

TestcaseViewComponent.propTypes = {
    data: PropTypes.object, 
    isLoading: PropTypes.bool, 
    projectName: PropTypes.string,
    environments: PropTypes.array, 
    isEnvironmentsLoading: PropTypes.bool,
    handleExecute: PropTypes.func
}
