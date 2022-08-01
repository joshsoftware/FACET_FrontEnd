import React from 'react'
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { ViewComponent } from '../../CustomComponents';

const EndpointViewComponent = ({ data }) => {
    const { projectName } = useParams();
    return (
        <ViewComponent 
            title={data.name}
            onEditLink={`/project/${projectName}/endpoints/edit/${data.id}`}
        >
            <Row>
                <Col className='pb-4'>
                    <small><b>Name</b></small>
                    <div>{data.name}</div>
                </Col>
                <Col className='pb-4'>
                    <small><b>Endpoint</b></small>
                    <div>{data.endpoint}</div>
                </Col>
            </Row>
            <Row>
                <Col className='pb-4'>
                    <small><b>Created At</b></small>
                    <div>{new Date(data.created_at).toLocaleString()}</div>
                </Col>
                <Col className='pb-4'>
                    <small><b>Created By</b></small>
                    <div>{data.created_by}</div>
                </Col>
            </Row>
            <Row>
                <Col className='pb-4'>
                    <small><b>Modified At</b></small>
                    <div>{new Date(data.modified_at).toLocaleString()}</div>
                </Col>
                <Col className='pb-4'>
                    <small><b>Modified By</b></small>
                    <div>{data.modified_by}</div>
                </Col>
            </Row>
        </ViewComponent>
    )
}

export default EndpointViewComponent;