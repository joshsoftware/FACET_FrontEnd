import React, { useState } from 'react'
import { Button, Table } from 'react-bootstrap';
import { EyeFill } from 'react-bootstrap-icons';
import BadgeComponent from '../../BadgeComponent';
import { ViewComponent } from '../../CustomComponents';
import ShowTestdataCombinationReport from './ShowTestdataCombinationReport';

const SingleTestsuiteReport = ({ data, isLoading }) => {
    const [showTestdataReportCombinationReportModal, setShowTestdataReportCombinationReportModal] = useState(false);
    const [selectedTestcaseReport, setSelectedTestcaseReport] = useState({});

    const handleOpenModal = (item) => {
        setShowTestdataReportCombinationReportModal(true);
        setSelectedTestcaseReport(item);
    }

    const handleCloseModal = () => {
        setShowTestdataReportCombinationReportModal(false);
    }

    return !isLoading&&(
        <>
            <ShowTestdataCombinationReport
                show={showTestdataReportCombinationReportModal}
                data={selectedTestcaseReport}
                handleClose={handleCloseModal}
            />
            <ViewComponent
                disabledBtns
                title={data.testsuite.name}
                rightChildrens={
                    <div>
                        <BadgeComponent 
                            bg="success"
                            className="mx-1"
                            label={`${data.no_of_passed_testcases} Passed`}
                        />
                        <BadgeComponent 
                            bg="danger"
                            label={`${data.no_of_failed_testcases} Failed`}
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
                        {data.testcases.map((item, index) => {
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
                                            onClick={() => handleOpenModal(item)}
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
}

export default SingleTestsuiteReport;