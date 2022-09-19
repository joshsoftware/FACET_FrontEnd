import React from 'react';
import PropTypes from 'prop-types';
import {
    Form
} from 'react-bootstrap';

const FormInput = (props) => {
    const {
        label,
        placeholder,
        name,
        value,
        onChange,
        type,
        element,
        text,
        className,
        style,
        isRequired,
        error,
        errorMessage
    } = props;
    return (
        <Form.Group className={`${className} mb-3`} style={style}>
            {label && (
                <Form.Label htmlFor={name} className='w-100'>
                    {label}
                    {isRequired && <span className='text-danger'>*</span> }
                </Form.Label>
            )}
            {element?element:(
                <Form.Control 
                    type={type || 'text'}
                    placeholder={placeholder}
                    name={name}
                    value={value}
                    onChange={onChange}
                    as={type==='textarea'?type:'input'}
                    rows={5}
                    className={error&&'border-danger error'}
                    {...props}
                />
            )}
            <Form.Text className={error?'text-danger':'text-muted'}>
                {error&&errorMessage?errorMessage:text}
            </Form.Text>
        </Form.Group>
    )
}

export default FormInput;

FormInput.propTypes = {
    label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ]),
    placeholder: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.any,
    value: PropTypes.any,
    onChange: PropTypes.func,
    type: PropTypes.string,
    element: PropTypes.element,
    text: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    isRequired: PropTypes.bool,
    error: PropTypes.bool,
    errorMessage: PropTypes.string
}

FormInput.defaultProp = {
    text: ""
}
