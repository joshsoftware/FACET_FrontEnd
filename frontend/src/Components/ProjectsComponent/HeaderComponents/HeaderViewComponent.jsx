import React from 'react'
import { Col, Row, Table } from 'react-bootstrap';
import { ViewComponent } from '../../CustomComponents';

const HeaderViewComponent = ({ data }) => {
    return (
        <ViewComponent title={data.name}>
            <Row>
                <Col className='pb-4'>
                    <small><b>Name</b></small>
                    <div>{data.name}</div>
                </Col>
            </Row>
            <Row>
                <Col className='pb-4'>
                    <small><b>Header</b></small>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Property</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(data.header).map(([key, value], index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{key}</td>
                                        <td>{value}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
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

export default HeaderViewComponent;