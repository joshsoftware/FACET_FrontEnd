import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { PencilSquare, TrashFill } from 'react-bootstrap-icons';
import ExpectedOutcomeModal from './ExpectedOutcomeModal';
import './style.css';


const ExpectedOutcomeTable = ({ data, onChange }) => {
    const [showModal, setShowModal] = useState(false);
    const [editData, setEditData] = useState(null);
    const [expectedOutcomeData, setExpectedOutcomeData] = useState(data);
    
    const onStartEditField = (item, index) => {
        setEditData({item, index});
        setShowModal(true);
    }

    const onSaveNewField = (val) => {
        setExpectedOutcomeData(expectedOutcomeData.concat(val));
        setShowModal(false);
        setEditData(null);
    }

    const onEditField = (val) => {
        let currData = expectedOutcomeData;
        currData[editData.index] = val;
        setExpectedOutcomeData(currData);
        setShowModal(false);
        setEditData(null);
    }

    const onCloseModal = () => {
        setShowModal(false);
        setEditData(null);
    }
    
    useEffect(() => {
        onChange(expectedOutcomeData)
    }, [expectedOutcomeData])
    
    return (
        <>
            <ExpectedOutcomeModal 
                show={showModal} 
                data={editData&&editData.item} 
                onAddNewField={onSaveNewField}
                onEditField={onEditField}
                onClose={onCloseModal} 
            />
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
                                        onClick={() => onStartEditField(item, index)}
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
            <div className='w-100 border border-top-0 px-4 alert-primary rounded-bottom addNewFieldTableButton' onClick={() => setShowModal(true)}>
                <span className='plusBtn'>+</span> Add New Field
            </div>
        </>
    )
}

export default ExpectedOutcomeTable;