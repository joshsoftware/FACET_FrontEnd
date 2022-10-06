import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Row } from 'react-bootstrap';
import { FormInput } from 'Components/forms/Inputs';

const SetCustomTimeInput = (props) => {
    const { value, handleChange } = props;

    const [formData, setFormData] = useState(value)

    const onchange = (e) => {
        setFormData(p => ({
            ...p,
            [e.target.name]: Number(e.target.value)
        }))
    }

    useEffect(() => {
        handleChange(formData);
    }, [formData])
    
    return (
        <Row>
            {['minutes', 'hours', 'days'].map((item, index) => {
                return (
                    <FormInput 
                        label={item}
                        type="number"
                        className='col-md-3'
                        value={formData[item]}
                        name={item}
                        onChange={onchange}
                        min={0}
                        key={index}
                    />
                )
            })}
        </Row>
    )
}

export default SetCustomTimeInput;

SetCustomTimeInput.propTypes = { 
    value: PropTypes.object, 
    handleChange: PropTypes.func 
}
