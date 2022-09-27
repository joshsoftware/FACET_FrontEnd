import React from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';

import { ViewComponent } from 'Components/CustomComponents';
import JSONView from 'Components/JSONView';
import { TableComponent } from 'Components/CustomComponents/index';

const PayloadViewComponent = (props) => {
    const { isLoading, data, projectName } = props;
    
    return !isLoading && data && (
        <ViewComponent 
            title={data.name}
            onEditLink={`/project/${projectName}/payloads/edit/${data.id}`}
        >
            <Row>
                <Col md={12} className='pb-4'>
                    <small><b>Name</b></small>
                    <div>{data.name}</div>
                </Col>
                <Col md={6} className='pb-4'>
                    <small><b>Parameters</b></small>
                    <TableComponent striped bordered size='sm' headings={["Key", "Value"]}>
                        {Object.entries(data.parameters || {}).map(([key, val], index) => {
                            return (
                                <tr key={index}>
                                    <td>{key}</td>
                                    <td>{val}</td>
                                </tr>
                            )
                        })}
                    </TableComponent>
                </Col>
                <Col md={6} className='pb-4'>
                    <small><b>Payload</b></small>
                    <JSONView data={data.payload} />
                </Col>
                <Col md={12} className='pb-4'>
                    <small><b>Expected Outcome</b></small>
                    <TableComponent
                        striped
                        bordered
                        headings={[
                            "#", 
                            "Name", 
                            "Type",
                            "isExact",
                            "Value",
                            "Validations"
                        ]}
                    >
                        {data.expected_outcome?.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.type}</td>
                                    <td>{item.isExact?"Yes":"No"}</td>
                                    <td>{item.value || "-"}</td>
                                    <td>
                                        <pre className='mb-0'>
                                            {JSON.stringify(item.validations, null, 2) || "-"}
                                        </pre>
                                    </td>
                                </tr>
                            )
                        })}

                    </TableComponent>
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

PayloadViewComponent.propTypes = {
    isLoading: PropTypes.bool,
    data: PropTypes.object,
    projectName: PropTypes.string
}
