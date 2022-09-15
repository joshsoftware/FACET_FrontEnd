import React from 'react';
import PropTypes from 'prop-types';
import { Accordion, Col, Row } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';

import BadgeComponent from 'Components/BadgeComponent';
import { ViewComponent } from 'Components/CustomComponents';
import JSONView from 'Components/JSONView';
import TestdataReportInfo from './components/TestdataReportInfo';

const ShowTestdataCombinationReport = (props) => {
    const { data, isLoading, projectName } = props;

    return !isLoading&&(
        Object.keys(data).length===0?(
            <Navigate to={`/project/${projectName}/reports`} />
        ):(
            <>
                <ViewComponent
                    disabledBtns
                    title={data.name}
                    rightChildrens={
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
                    }
                >
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
                                {data?.testdata_combinations.map((item, index) => {
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
                </ViewComponent>
            </>
        )
    )
}

export default ShowTestdataCombinationReport;

ShowTestdataCombinationReport.propTypes = { 
    data: PropTypes.object, 
    isLoading: PropTypes.bool,
    projectName: PropTypes.string
}
