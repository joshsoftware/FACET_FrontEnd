import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { CaretRightFill, Check2, PencilSquare, Trash } from 'react-bootstrap-icons';


const AddButton = ({ handleClick, disabled, size, label, ...props }) => {
    return (
        <Button
            type='button'
            onClick={handleClick}
            variant='success'
            size={size}
            disabled={disabled}
            {...props}
        >
            + {label?label:'Add'}
        </Button>
    )
}

const CloseButton = ({ handleClick, disabled, size, label, ...props }) => {
    return (
        <Button
            type='button'
            onClick={handleClick}
            variant='secondary'
            size={size}
            disabled={disabled}
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

const NextButton = ({ handleClick, disabled, size, label, ...props }) => {
    return (
        <Button
            type='button'
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
            <CaretRightFill />
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
                {label?label:"Save"}
            </span>
        </Button>
    )
}

const EditButton = ({ handleClick, disabled, size, label, ...props }) => {
    return (
        <Button
            type='button'
            onClick={handleClick}
            variant='primary'
            disabled={disabled}
            size={size}
            className='d-flex align-items-center'
            label={label}
            {...props}
        >
            <PencilSquare />
            <span className='px-2'>
                Edit
            </span>
        </Button>
    )
}

const DeleteButton = ({ handleClick, disabled, size, label, ...props }) => {
    return (
        <Button
            type='button'
            onClick={handleClick}
            variant='danger'
            disabled={disabled}
            size={size}
            className='d-flex align-items-center'
            {...props}
        >
            <Trash />
            <span className='px-2'>
                {label?label:"Delete"}
            </span>
        </Button>
    )
}

export {
    AddButton,
    CloseButton,
    DeleteButton,
    EditButton,
    NextButton,
    SaveButton,
    SubmitButton,
};

AddButton.propTypes = {
    disabled: PropTypes.bool, 
    handleClick: PropTypes.func, 
    size: PropTypes.string, 
    label: PropTypes.string
}

CloseButton.propTypes = {...PropTypes.instanceOf(AddButton)}
DeleteButton.propTypes = {...PropTypes.instanceOf(AddButton)}
EditButton.propTypes = {...PropTypes.instanceOf(AddButton)}
NextButton.propTypes = {...PropTypes.instanceOf(AddButton)}
SaveButton.propTypes = {...PropTypes.instanceOf(AddButton)}
SubmitButton.propTypes = {...PropTypes.instanceOf(AddButton)}
