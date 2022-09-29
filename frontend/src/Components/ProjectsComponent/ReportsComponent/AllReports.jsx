import React from 'react';
import PropTypes from 'prop-types';
import { Button, Table } from 'react-bootstrap';
import { EyeFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

import { ViewComponent } from 'Components/CustomComponents';
import BadgeComponent from 'Components/BadgeComponent';
import NoResultsFound from 'Components/NoResultsFound';

const AllReports = (props) => {
    const { data, isLoading, projectName, onNavigate } = props;

    return (
        <ViewComponent
            disabledBtns
            title="Reports"
        >
            {!isLoading && data.length===0?(
                <NoResultsFound
                    btnLabel="Run New Suite"
                    btnOnclick={() => onNavigate(`/project/${projectName}/testcases`)}
                />
            ):(
                <Table striped bordered>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Test Suite</th>
                            <th>Executed By</th>
                            <th>Total Testcaes</th>
                            <th>Passed</th>
                            <th>Failed</th>
                            <th>Executed On</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {!isLoading&&(
                            data.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            {item.id}
                                        </td>
                                        <td>
                                            <Link to={`${item.id}`} className="text-dark text-decoration-none">
                                                {item.testcase.name}
                                            </Link>
                                        </td>
                                        <td>{item.executed_by.name}</td>
                                        <td>{item.no_of_passed_teststeps + item.no_of_failed_teststeps}</td>
                                        <td className='text-success'>
                                            <BadgeComponent 
                                                bg="success"
                                                label={item.no_of_passed_teststeps}
                                            />
                                        </td>
                                        <td className='text-danger'>
                                            <BadgeComponent 
                                                bg="danger"
                                                label={item.no_of_failed_teststeps}
                                            />
                                        </td>
                                        <td>{new Date(item.executed_on).toLocaleString()}</td>
                                        <td>
                                            <Link to={`${item.id}`}>
                                                <Button
                                                    size='sm'
                                                    variant='secondary'
                                                    className='d-flex justify-content-center align -items-center'
                                                >
                                                    <EyeFill />
                                                </Button>
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            })
                        )}
                    </tbody>
                </Table>
            )}
        </ViewComponent>
    )
}

export default AllReports;

AllReports.propTypes = { 
    data: PropTypes.array, 
    isLoading: PropTypes.bool, 
    projectName: PropTypes.string,
    onNavigate: PropTypes.func
}
