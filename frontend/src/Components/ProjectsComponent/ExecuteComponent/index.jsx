import React from 'react';
import PropTypes from 'prop-types';
import { Accordion, Badge } from 'react-bootstrap';

import { ViewComponent } from 'Components/CustomComponents';


const ExecuteComponent = (props) => {
    const { results, data } = props;
    return (
        <div className='w-100'>
            <ViewComponent
                title={data.name}
                disabledBtns
            >
                <Accordion>
                    {data?.teststeps?.map((e, index) => {
                        let resultInstance = results.filter(res => res.name === e.name)[0] || {};
                        return (
                            <Accordion.Item key={index} className={`${resultInstance.status === 'passed' ? (
                                'border-success text-success'
                            ) : (
                                resultInstance.status === 'failed' ? (
                                    'border-danger text-danger'
                                ) : ''
                            )}`
                            } eventKey={e.name}>
                                <Accordion.Header >
                                    {e.name}
                                    <Badge bg="success" className='mx-1'>{resultInstance.no_of_passed_testdata_combinations} Pass</Badge>
                                    <Badge bg="danger">{resultInstance.no_of_failed_testdata_combinations} Fail</Badge>
                                </Accordion.Header>
                                <Accordion.Body>
                                    <div>
                                        {resultInstance.status ?
                                            (resultInstance.status === 'passed' ?
                                                (<>status : {resultInstance.status}</>)
                                                : (
                                                    <pre>
                                                        {JSON.stringify(resultInstance.response, null, 2)}
                                                    </pre>
                                                    ))
                                            : (
                                                <>
                                                    status : Yet to be executed
                                                </>
                                            )
                                        }
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        )
                    })}
                </Accordion>
            </ViewComponent>
        </div>
    )
}

export default ExecuteComponent;

ExecuteComponent.propTypes = {
    results: PropTypes.array,
    data: PropTypes.object
}
