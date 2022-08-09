import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap';
import Select from 'react-select';

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
        isMulti,
        ...props
    }
) => {
    const [defaultValue, setDefaultValue] = useState();
    
    useEffect(() => {
        if(isMulti) {
            let vals = value.map(e => e.id);
            let res = options.filter(function(item) {
                return vals.indexOf(item.value) != -1;
            })
            setDefaultValue(res);
        } else {
            setDefaultValue(options.find(val => val.value===value))
        }
    }, [value, options])
    

    return (

        <>
            <Form.Group className={`${className} mb-3`} style={style}>
                {label&&(
                    <Form.Label htmlFor={name} className='w-100' >
                        {label}
                        {isRequired&&<span className='text-danger'>*</span>}
                    </Form.Label>
                )}
                <Select 
                    value={defaultValue}
                    options={options}
                    onChange={e => handlechange(name, e.value)}
                    isMulti={isMulti}
                    {...props}
                />
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