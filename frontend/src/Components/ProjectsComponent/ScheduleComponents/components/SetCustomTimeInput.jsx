import React, { useState } from 'react'
import { Row } from 'react-bootstrap';
import { FormInput } from '../../../forms/Inputs';

const SetCustomTimeInput = () => {
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
                    />
                )
            })}
        </Row>
    )
}

export default SetCustomTimeInput;