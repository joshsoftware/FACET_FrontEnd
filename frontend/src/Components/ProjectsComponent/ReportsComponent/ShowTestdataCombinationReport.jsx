import React from 'react';
import { Accordion, Col, Row } from 'react-bootstrap';
import BadgeComponent from '../../BadgeComponent';
import { CustomModal } from '../../CustomComponents';
import { CloseButton } from '../../forms/Buttons';
import JSONView from '../../JSONView';
import TestdataReportInfo from './component/TestdataReportInfo';

const ShowTestdataCombinationReport = ({ show, data, handleClose }) => {
    return (
        <CustomModal
            show={show}
            handleClose={handleClose}
            title="Testcase Report"
            size="lg"
        >
            <CustomModal.Body>
                <div className='d-flex justify-content-between align-items-center border-bottom pb-2'>
                    <div className='d-flex align-items-center'>
                        <h4>{data.name}</h4>
                        <BadgeComponent 
                            bg="secondary"
                            className="ms-2"
                            label={data.method}
                        />
                    </div>
                    <div>
                        <BadgeComponent 
                            bg="success"
                            className="mx-1"
                            label={`${data.no_of_passed_testdata_combinations} Passed`}
                        />
                        <BadgeComponent 
                            bg="danger"
                            className="mx-1"
                            label={`${data.no_of_failed_testdata_combinations} Failed`}
                        />
                    </div>
                </div>

                <div className='my-2 mx-1'>
                    <Row>
                        <Col md={6}>
                            <small>
                                <b>Endpoint</b>
                            </small>
                            <div>{data.endpoint}</div>
                        </Col>
                        <Col md={6}>
                            <small>
                                <b>Header</b>
                            </small>
                            <div>
                                <JSONView data={data.header} />
                            </div>
                        </Col>
                        <Col md={6}>

                        </Col>
                    </Row>
                    
                    <div>
                        <small>
                            <b>Testdata Combinations</b>
                        </small>
                        
                        <Accordion>
                            {data.testdata_combinations&&data.testdata_combinations.map((item, index) => {
                                return (
                                    <TestdataReportInfo 
                                        item={item}
                                        key={index}
                                        eventKey={index}
                                    />
                                )
                            })}
                        </Accordion>
                    </div>
                </div>
            </CustomModal.Body>
            <CustomModal.Footer>
                <CloseButton 
                    handleClick={handleClose}
                />
            </CustomModal.Footer>
        </CustomModal>
    )
}

export default ShowTestdataCombinationReport;