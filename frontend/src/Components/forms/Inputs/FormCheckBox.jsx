import React from 'react'
import { Form } from 'react-bootstrap';

const FormCheckBox = (
    {
        label,
        name,
        id,
        value,
        handlechange,
        text,
        className,
        style,
        disabled,
        ...props
    }
) => {
    return (
        <Form.Group className={className} style={style}>
            <Form.Check 
                type='checkbox'
                label={label}
                name={name}
                checked={value}
                onChange={handlechange}
            />
            {text&&(
                <Form.Text className='text-muted'>
                    {text}
                </Form.Text>
            )}
        </Form.Group>
    )
}

export default FormCheckBox;