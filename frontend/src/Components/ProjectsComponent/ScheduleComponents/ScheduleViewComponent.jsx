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
                        <th>Scheduled On</th>
                        <th>Status</th>
                        <th>Scheduled By</th>
                    </tr>
                </thead>
                <tbody>
                    {/* To be Done */}
                </tbody>
            </Table>
        </ViewComponent>
    )
}

export default ScheduleViewComponent;