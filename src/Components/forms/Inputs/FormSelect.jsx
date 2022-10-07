import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import Select from 'react-select';

const FormSelect = (props) => {
    const {
        label,
        name,
        value,
        handlechange,
        text,
        className,
        style,
        isRequired,
        options,
        isMulti,
        placeholder
    } = props;
    const [defaultValue, setDefaultValue] = useState();
    
    useEffect(() => {
        if(isMulti) {
            let vals = value.map(val => val);
            let res = options.filter(function(item) {
                return vals.indexOf(item.value) != -1;
            })
            setDefaultValue(res);
        } else {
            setDefaultValue(options.find(val => val.value===value));
        }
    }, [value, options])

    const onChange = (e) => {
        if(isMulti) {
            handlechange(name, e)
        } else {
            handlechange(name, e.value)
        }
    }

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
                    options={options}
                    onChange={onChange}
                    value={defaultValue}
                    isMulti={isMulti}
                    placeholder={placeholder}
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

FormSelect.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.string,
    value: PropTypes.any,
    handlechange: PropTypes.func,
    element: PropTypes.element,
    text: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    isRequired: PropTypes.bool,
    options: PropTypes.array,
    isMulti: PropTypes.bool,
    placeholder: PropTypes.string
}

FormSelect.defaultProps = {
    isMulti: false
}
