import React from 'react'
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { ViewComponent } from '../../CustomComponents';

const PayloadViewComponent = ({ data }) => {
    const { projectName } = useParams();
    return (
        <ViewComponent 
            title={data.name}
            onEditLink={`/project/${projectName}/payloads/edit/${data.id}`}
        >
            <Row>
                <Col md={6} className='pb-4'>
                    <small><b>Name</b></small>
                    <div>{data.name}</div>
                </Col>
                <Col md={12} className='pb-4'>
                    <small><b>Payload</b></small>
                    <pre>{JSON.stringify(data.payload, null, 4)}</pre>
                </Col>
                <Col md={12} className='pb-4'>
                    <small><b>Expected Outcome</b></small>
                    <pre>{JSON.stringify(data.expected_outcome, null, 2)}</pre>
                </Col>
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
    )
}

export default PayloadViewComponent;