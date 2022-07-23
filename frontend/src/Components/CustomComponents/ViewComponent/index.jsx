import React from 'react'
import { Card } from 'react-bootstrap';
import { ArrowLeft } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { DeleteButton, EditButton, SaveButton } from '../../forms/Buttons';

const ViewComponent = ({
    children,
    title,
    type,
    onSave,
    onEdit,
    onDelete,
    onSaveDisabled
}) => {
    let navigate = useNavigate();


    return (
        <div className='p-5 w-100'>
            <div className='mb-4 sticky-top d-flex justify-content-between align-items-center'>
                <div>
                    <div className='text-primary'>
                        <span 
                            className='d-flex align-items-center'
                            style={{cursor: 'pointer', width: 'fit-content'}}
                            onClick={()  => navigate(-1)}
                        >
                            <ArrowLeft />
                            Back
                        </span>
                    </div>
                    <h2>{title}</h2>
                </div>
                <div className='d-flex justify-content-between align-items-center'>
                    {type==='save'?(
                        <SaveButton 
                            handleClick={onSave}
                            disabled={onSaveDisabled}
                        />
                    ):(
                        <>
                            <EditButton 
                                className='mx-2'
                                handleClick={onEdit}
                            />
                            <DeleteButton handleClick={onDelete} />
                        </>
                    )}
                </div>
            </div>
            
            <div>
                <Card className='w-100 p-3'>
                    <Card.Body>
                        {children}
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}

export default ViewComponent;