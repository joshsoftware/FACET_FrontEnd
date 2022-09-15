import React from 'react'
import PropTypes from 'prop-types';
import { Button, Table } from 'react-bootstrap';
import { EyeFill } from 'react-bootstrap-icons';
import { Navigate } from 'react-router-dom';

import BadgeComponent from '../../BadgeComponent';
import { ViewComponent } from '../../CustomComponents';

const SingleTestcaseReport = (props) => {
    const { data, isLoading, projectName, onNavigate } = props;

    return !isLoading&&(
        Object.keys(data).length===0?(
            <Navigate to={`/project/${projectName}/reports`} />
        ):(
            <>
                <ViewComponent
                    disabledBtns
                    title={data.testcase.name}
                    rightChildrens={
                        <div>
                            <BadgeComponent 
                                bg="success"
                                className="mx-1"
                                label={`${data.no_of_passed_teststeps} Passed`}
                            />
                            <BadgeComponent 
                                bg="danger"
                                label={`${data.no_of_failed_teststeps} Failed`}
                            />
                        </div>
                    }
                >
                    <Table bordered striped>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Testcase</th>
                                <th>Method</th>
                                <th>No. of Testdata</th>
                                <th>Status</th>
                                <th>Passed</th>
                                <th>Failed</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.teststeps.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.method}</td>
                                        <td>{item.testdata_combinations.length}</td>
                                        <td className={`text-capitalize ${item.status==='passed'?'text-success':'text-danger'}`}>
                                            {item.status}
                                        </td>
                                        <td>
                                            <BadgeComponent 
                                                bg="success"
                                                label={item.no_of_passed_testdata_combinations}
                                            />
                                        </td>
                                        <td>
                                            <BadgeComponent 
                                                bg="danger"
                                                label={item.no_of_failed_testdata_combinations}
                                            />    
                                        </td>
                                        <td>
                                            <Button
                                                size='sm'
                                                variant='secondary'
                                                onClick={() => onNavigate(item.name)}
                                                className='d-flex justify-content-center align -items-center'
                                            >
                                                <EyeFill />
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </ViewComponent>
            </>
        )
    )
}

export default SingleTestcaseReport;

SingleTestcaseReport.propTypes = { 
    data: PropTypes.object, 
    isLoading: PropTypes.bool,
    projectName: PropTypes.string,
    onNavigate: PropTypes.func
}
