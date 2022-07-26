import React from 'react'
import { Accordion, Button, Col, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { ViewComponent } from '../../CustomComponents';

const TestsuiteViewComponent = ({ data }) => {
    let navigate = useNavigate();
    const { projectName } = useParams();
    return (
        <div className='w-100'>
            <ViewComponent title={data.name}>
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
                        <small><b>Testcases</b></small>
                        <div>
                            <Accordion>
                                {data.testcases.map((item, index) => {
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
                                                        <div>{item.testdata.length}</div>
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
                <div className='text-end'>
                    <Button 
                        variant='success'
                        onClick={() => navigate(`/project/${projectName}/execute/${data.id}`)}
                    >
                        Execute
                    </Button>
                </div>
            </ViewComponent>
        </div>
    )
}

export default TestsuiteViewComponent;