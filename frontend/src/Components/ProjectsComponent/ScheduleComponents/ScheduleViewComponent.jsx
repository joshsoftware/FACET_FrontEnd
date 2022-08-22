import React from 'react'
import { Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ViewComponent } from '../../CustomComponents';
import { AddButton } from '../../forms/Buttons';

const ScheduleViewComponent = ({ data }) => {
    let navigate = useNavigate();

    return (
        <ViewComponent 
            title="Schedule Testsuites"
            disabledBtns
            rightChildrens={
                <AddButton 
                    label="Schedule Testsuite"
                    handleClick={() => navigate('new')}
                />
            }
        >
            <Table striped bordered>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Testsuite</th>
                        <th>Environment</th>
                        <th>Frequency</th>
                        <th>Created On</th>
                        <th>Status</th>
                        <th>Scheduled By</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.testsuite}</td>
                                <td>{item.environment}</td>
                                <td className='text-capitalize'>{item.frequency_type}</td>
                                <td>{item.created_at}</td>
                                <td>{"-"}</td>
                                <td>{item.scheduled_by}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </ViewComponent>
    )
}

export default ScheduleViewComponent;