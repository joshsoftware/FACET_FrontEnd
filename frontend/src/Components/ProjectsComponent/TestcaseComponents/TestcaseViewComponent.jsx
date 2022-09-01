import React, { useState } from 'react'
import { Accordion, Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { ViewComponent } from '../../CustomComponents';
import { AddButton } from '../../forms/Buttons';
import AddNewTestdata from './AddNewTestdata';
import JSONView from 'Components/JSONView';

const TestcaseViewComponent = ({ data, testdata }) => {
    const { projectName } = useParams();
    const [showAddTestData, setShowAddTestData] = useState(false);

    return (
        <div className='w-100'>
            <ViewComponent 
                title={data.name}
                onEditLink={`/project/${projectName}/testcases/edit/${data.id}`}
            >
                <Row>
                    <Col md={6} className='pb-4'>
                        <small><b>Name</b></small>
                        <div>{data.name}</div>
                    </Col>
                    <Col md={6} className='pb-4'>
                        <small><b>Method</b></small>
                        <div>{data.method}</div>
                    </Col>
                    <Col md={6} className='pb-4'>
                        <small><b>Endpoint</b></small>
                        <div>{data.endpoint.name}</div>
                    </Col>
                    <Col md={6} className='pb-4'>
                        <small><b>Header</b></small>
                        <div>{data.header.name}</div>
                    </Col>
                    <Col md={6} className='pb-4'>
                        <small><b>Payload</b></small>
                        <div>{data.payload.name}</div>
                    </Col>
                </Row>
                <Row>
                    <Col md={6} className='pb-4'>
                        <small><b>Created At</b></small>
                        <div>{new Date(data.created_at).toLocaleString()}</div>
                    </Col>
                    <Col md={6} className='pb-4'>
                        <small><b>Created By</b></small>
                        <div>{data.created_by}</div>
                    </Col>
                    <Col md={6} className='pb-4'>
                        <small><b>Modified At</b></small>
                        <div>{new Date(data.modified_at).toLocaleString()}</div>
                    </Col>
                    <Col md={6} className='pb-4'>
                        <small><b>Modified By</b></small>
                        <div>{data.modified_by}</div>
                    </Col>
                </Row>
            </ViewComponent>

            <ViewComponent
                disabledHeader
            >
                <small><b>TestData</b></small>
                <Accordion>
                    {testdata&&testdata.map((item, index) => {
                        return (
                            <Accordion.Item key={index} eventKey={index}>
                                <Accordion.Header>
                                    {item.name}
                                </Accordion.Header>
                                <Accordion.Body>
                                    <Row>
                                        <Col md={6}>
                                            <Col md={12}>
                                                <div><small>Parameters</small></div>
                                                <JSONView 
                                                    data={item.parameters}
                                                />
                                            </Col>
                                            <Col md={12}>
                                                <div><small>Payload</small></div>
                                                <pre>
                                                    {JSON.stringify(item.payload, null, 2)}
                                                </pre>
                                            </Col>
                                        </Col>
                                        <Col md={6}>
                                            <div><small>Expected Outcome</small></div>
                                            <pre>
                                                {JSON.stringify(item.expected_outcome, null, 2)}
                                            </pre>
                                        </Col>
                                    </Row>
                                </Accordion.Body>
                            </Accordion.Item>
                        )
                    })}
                </Accordion>
                {showAddTestData?(   
                    <AddNewTestdata 
                        data={data} 
                        handleClose={() => setShowAddTestData(false)}
                    />
                ):(
                    <div className="d-flex justify-content-center py-2">
                        <AddButton 
                            size='sm' 
                            handleClick={() => setShowAddTestData(true)}
                        />
                    </div>
                )}
            </ViewComponent>
        </div>
    )
}

export default TestcaseViewComponent;