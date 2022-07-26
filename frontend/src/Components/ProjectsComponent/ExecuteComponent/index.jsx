import React from 'react'
import { Accordion } from 'react-bootstrap';
import { useSelector } from 'react-redux'
import { ViewComponent } from '../../CustomComponents';

const mapState = ({ execute }) => ({
    results: execute.results,
    data: execute.data,
    isLoading: execute.isLoading
})

const ExecuteComponent = () => {
    const { results, data, isLoading } = useSelector(mapState);
    
    return (
        <div className='w-100'>
            {console.log(data)}
            <ViewComponent
                title={data.name}
                disabledBtns
            >
                <Accordion>
                    {data.testcases&&data.testcases.map((e, index) => {
                        let resultInstance = results.filter(res => res.name === e.name)[0] || {};
                        return (
                            <Accordion.Item key={index} className={`my-2 ${resultInstance.status === 'passed' ? (
                                'border-success text-success'
                            ) : (
                                resultInstance.status === 'failed' ? (
                                    'border-danger text-danger'
                                ) : ''
                            )}`
                            } eventKey={e.name}>
                                <Accordion.Header variant="danger" className="text-danger" style={{color: "red !important"}} >{e.name}</Accordion.Header>
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
                                            : (<>status : Yet to be executed
                                            </>)
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