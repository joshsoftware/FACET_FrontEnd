import React from 'react';
import { Button } from 'react-bootstrap';
import { Check2 } from 'react-bootstrap-icons';

const CloseButton = ({ handleClick, disabled, size, label, ...props }) => {
    return (
        <Button
            type='button'
            onClick={handleClick}
            variant='secondary'
            size={size}
            {...props}
        >
            {label?label:'Close'}
        </Button>
    )
}

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

const SaveButton = ({ handleClick, disabled, size, label, ...props }) => {
    return (
        <Button
            type='submit'
            onClick={handleClick}
            variant='success'
            disabled={disabled}
            size={size}
            className='d-flex align-items-center'
            {...props}
        >
            <Check2 />
            <span className='px-2'>
                {label?label:"Next"}
            </span>
        </Button>
    )
}

export {
    CloseButton,
    SaveButton,
    SubmitButton,
};