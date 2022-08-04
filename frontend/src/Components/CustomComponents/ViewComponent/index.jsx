import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap';
import { ArrowLeft } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { DeleteButton, EditButton, SaveButton } from '../../forms/Buttons';
import './style.css';

const ViewComponent = ({
    disabledHeader,
    children,
    title,
    type,
    onSave,
    onEditLink,
    onDelete,
    onSaveDisabled,
    disabledBtns
}) => {
    let navigate = useNavigate();
    const [isSticky, setIsSticky] = useState(false);

    const toggleSticky = () => {
        if(window.scrollY>=60) {
            setIsSticky(true);
        } else {
            setIsSticky(false);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', toggleSticky);
        return () => {
            window.removeEventListener('scroll', toggleSticky);
        }
    }, [])

    return (
        <div className='w-100'>
            {!disabledHeader&&(
                <div className={`mt-4 px-5 d-flex justify-content-between align-items-center viewcomponent-header ${isSticky&&'sticky-component-header'}`}>
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
                    {!disabledBtns&&(
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
                                        handleClick={() => navigate(onEditLink)}
                                    />
                                    <DeleteButton handleClick={onDelete} disabled />
                                </>
                            )}
                        </div>
                    )}
                </div>
            )}
            
            <div className='px-5 py-3'>
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