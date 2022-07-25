import React from 'react'
import { Form } from 'react-bootstrap';

const FormSelect = (
    {
        label,
        name,
        id,
        value,
        handlechange,
        element,
        text,
        className,
        style,
        isRequired,
        options,
        ...props
    }
) => {
    return (
        <>
            <Form.Group className={`${className} mb-3`} style={style}>
                {label&&(
                    <Form.Label htmlFor={name} className='w-100' >
                        {label}
                        {isRequired&&<span className='text-danger'>*</span>}
                    </Form.Label>
                )}
                {element?element:(
                    <Form.Select 
                        defaultValue={value?value:"0"} 
                        name={name} 
                        onChange={handlechange}
                    >
                        <option value="0" disabled>Select...</option>
                        {options.map((e, index) => {
                            return (
                                <option key={index} value={e[0]}>{e[1]}</option>
                            )
                        })}
                    </Form.Select>
                )}
                {text && (
                    <Form.Text className='text-muted'>
                        {text}
                    </Form.Text>
                )}
            </Form.Group>
        </>
    )
}

export default FormSelect;