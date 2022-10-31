import React from 'react';
import { Button } from 'react-bootstrap';
import { EyeFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import BadgeComponent from 'Components/BadgeComponent';
import InfiniteScroll from 'Components/InfiniteScroll';
import NoResultsFound from 'Components/NoResultsFound';
import TableComponent from 'Components/CustomComponents/TableComponent/index';
import { ViewComponent } from 'Components/CustomComponents';

const AllReports = ({ data, isLoading, projectName, onNavigate, fetchMore, totalResults }) => (
    <ViewComponent disabledBtns title="Reports">
        {!isLoading && data.length === 0 ? (
            <NoResultsFound
                btnLabel="Run New Suite"
                btnOnclick={() => onNavigate(`/project/${projectName}/testcases`)}
            />
        ) : (
            <InfiniteScroll
                dataLength={data.length}
                next={fetchMore}
                hasMore={data.length !== totalResults}
            >
                <TableComponent
                    striped
                    bordered
                    headings={[
                        '#',
                        'Testcase',
                        'Executed By',
                        'Total Teststeps',
                        'Passed',
                        'Failed',
                        'Executed On',
                        '',
                    ]}
                >
                    {data.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>
                                    <Link
                                        to={`${item.id}`}
                                        className="text-dark text-decoration-none"
                                    >
                                        {item.testcase.name}
                                    </Link>
                                </td>
                                <td>{item.executed_by.name}</td>
                                <td>{item.no_of_passed_teststeps + item.no_of_failed_teststeps}</td>
                                <td className="text-success">
                                    <BadgeComponent
                                        bg="success"
                                        label={item.no_of_passed_teststeps}
                                    />
                                </td>
                                <td className="text-danger">
                                    <BadgeComponent
                                        bg="danger"
                                        label={item.no_of_failed_teststeps}
                                    />
                                </td>
                                <td>{new Date(item.executed_on).toLocaleString()}</td>
                                <td>
                                    <Link to={`${item.id}`}>
                                        <Button
                                            size="sm"
                                            variant="secondary"
                                            className="d-flex justify-content-center align -items-center"
                                        >
                                            <EyeFill />
                                        </Button>
                                    </Link>
                                </td>
                            </tr>
                        );
                    })}
                </TableComponent>
            </InfiniteScroll>
        )}
    </ViewComponent>
);

AllReports.propTypes = {
    data: PropTypes.array.isRequired,
    isLoading: PropTypes.bool,
    projectName: PropTypes.string.isRequired,
    onNavigate: PropTypes.func.isRequired,
    fetchMore: PropTypes.func.isRequired,
    totalResults: PropTypes.number.isRequired,
};

export default AllReports;
