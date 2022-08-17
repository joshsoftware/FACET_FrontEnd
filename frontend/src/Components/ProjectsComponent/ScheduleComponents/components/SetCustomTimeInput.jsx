import React, { useEffect, useState } from 'react'
import { Row } from 'react-bootstrap';
import { FormInput } from '../../../forms/Inputs';

const SetCustomTimeInput = ({ value, handleChange }) => {
    const [formData, setFormData] = useState({
        minutes: 0,
        hours: 0,
        days: 0  
    })

    const onchange = (e) => {
        setFormData(p => ({
            ...p,
            [e.target.name]: e.target.value
        }))
    }

    useEffect(() => {
        let customTimeInput = formData.days+'d,'+formData.hours+'h,'+formData.minutes+'m';
        console.log(customTimeInput)
        handleChange(customTimeInput);
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
                        handlechange={onchange}
                        min={0}
                        key={index}
                    />
                )
            })}
        </Row>
    )
}

export default SetCustomTimeInput;