import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { PencilSquare, TrashFill } from 'react-bootstrap-icons';

import ExpectedOutcomeModal from './ExpectedOutcomeModal';
import './style.css';
import TableComponent from 'Components/CustomComponents/TableComponent/index';


const ExpectedOutcomeTable = (props) => {
    const { data, onchange } = props;

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

    const onRemoveField = (ind) => {
        let currData = expectedOutcomeData.splice(ind, 1);
        setExpectedOutcomeData(currData);
    }

    const onCloseModal = () => {
        setShowModal(false);
        setEditData(null);
    }
    
    useEffect(() => {
        onchange(expectedOutcomeData)
    }, [expectedOutcomeData])

    useEffect(() => {
        setExpectedOutcomeData(data)
    }, [data])
    
    
    return (
        <>
            <ExpectedOutcomeModal 
                show={showModal} 
                data={editData&&editData.item} 
                onAddNewField={onSaveNewField}
                onEditField={onEditField}
                onClose={onCloseModal} 
            />
            <TableComponent
                striped
                hover
                bordered
                className="mb-0"
                headings={["Name", "Type", "Value", ""]}
            >
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
                                        onClick={() => onRemoveField(index)}
                                    />
                                    )}
                            </td>
                        </tr>
                    )
                })}
            </TableComponent>
            <div className='w-100 border border-top-0 px-4 alert-primary rounded-bottom addNewFieldTableButton' onClick={() => setShowModal(true)}>
                <span className='plusBtn'>+</span> Add New Field
            </div>
        </>
    )
}

export default ExpectedOutcomeTable;

ExpectedOutcomeTable.propTypes = { 
    data: PropTypes.array, 
    onchange: PropTypes.func
}
