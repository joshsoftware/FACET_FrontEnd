import React from 'react'
import { Col, Row } from 'react-bootstrap';
import { ViewComponent } from '../../CustomComponents';

const EnvironmentViewComponent = ({ data }) => {
    return (
        <ViewComponent title={data.name}>
            <Row>
                <Col className='pb-4'>
                    <small><b>Name</b></small>
                    <div>{data.name}</div>
                </Col>
                <Col className='pb-4'>
                    <small><b>URL</b></small>
                    <div>{data.url}</div>
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

export default EnvironmentViewComponent;