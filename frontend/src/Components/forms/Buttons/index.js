import React from 'react';
import { Button } from 'react-bootstrap';

const SubmitButton = ({ handleClick, disabled, size, label, ...props }) => {
    return (
        <Button
            type='submit'
            onClick={handleClick}
            variant='primary'
            disabled={disabled}
            size={size}
            className='d-flex align-items-center'
            {...props}
        >
            <span className='px-2'>
                {label?label:"Next"}
            </span>
        </Button>
    )
}

const SaveButton = () => {
    return (
        <div>Save</div>
    )
}

export {
    SaveButton,
    SubmitButton,
};