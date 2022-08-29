import React from 'react';
import { Accordion, Col, Row } from 'react-bootstrap';
import { Navigate, useParams } from 'react-router-dom';
import BadgeComponent from '../../BadgeComponent';
import { ViewComponent } from '../../CustomComponents';
import JSONView from '../../JSONView';
import TestdataReportInfo from './components/TestdataReportInfo';

const ShowTestdataCombinationReport = ({ data, isLoading }) => {
    const { projectName } = useParams();
    
    return !isLoading&&(
        Object.keys(data).length===0?(
            <Navigate to={`/project/${projectName}/reports`} />
        ):(
            <>
                <ViewComponent
                    disabledBtns
                    title={
                        <div>
                            {data.name}
                        </div>
                    }
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
                </ViewComponent>
            </>
        )
    )
}

export default ShowTestdataCombinationReport;