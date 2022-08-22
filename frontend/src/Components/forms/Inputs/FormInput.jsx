import React from 'react'
import {
    Form
} from 'react-bootstrap';

const FormInput = (
    {
        label,
        placeholder,
        name,
        id,
        value,
        handlechange,
        type,
        element,
        text,
        className,
        style,
        isRequired,
        error,
        errorMessage,
        ...props
    }
) => {
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
                    onChange={handlechange}
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