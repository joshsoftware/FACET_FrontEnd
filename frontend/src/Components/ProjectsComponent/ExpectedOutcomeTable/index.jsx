import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import { PencilSquare, TrashFill } from 'react-bootstrap-icons';
import ExpectedOutcomeModal from './ExpectedOutcomeModal';
import './style.css';

const INITIAL_VALUE = {
    name: "",
    type: "",
    isExact: "",
    value: ""
}

const ExpectedOutcomeTable = () => {
    const [expectedOutcomeData, setExpectedOutcomeData] = useState(
        [
            {
                name: "status_code",
                type: "number",
                isExact: true,
                value: 200
            }
        ]
    );


    return (
        <>
        <ExpectedOutcomeModal show={true} data={expectedOutcomeData[0]} onClose={() => { }} />
            <Table striped hover className='border mb-0'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Value</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {expectedOutcomeData.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td className='text-capitalize'>{item.type}</td>
                                <td>{item.value}</td>
                                <td className='tableActions'>
                                    <PencilSquare 
                                        color='#505050' 
                                        className='mx-1 icon'
                                    />
                                    {index!==0&&(
                                        <TrashFill 
                                            color='#ff3232' 
                                            className='mx-1 icon'  
                                        />
                                    )}
                                    
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
            <div className='w-100 border border-top-0 px-4 alert-primary rounded-bottom addNewFieldTableButton'>
                <span className='plusBtn'>+</span> Add New Field
            </div>
        </>
    )
}

export default ExpectedOutcomeTable;