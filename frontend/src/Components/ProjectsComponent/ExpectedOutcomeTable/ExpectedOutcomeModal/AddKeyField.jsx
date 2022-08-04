import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import { Check2Circle, Infinity } from 'react-bootstrap-icons';
import { toast } from 'react-toastify';
import { CustomModal } from '../../../CustomComponents';
import { NextButton } from '../../../forms/Buttons';
import FormInput from '../../../forms/Inputs/FormInput';
import FieldBox from './components/FieldBox';


const INITIAL_VALUE = {
    name: "",
    type: ""
}

const AddKeyField = ({ data, onSuccess }) => {
    const [formData, setFormData] = useState(INITIAL_VALUE);

    const onchange = (e) => {
        setFormData({...formData, [e.target.name]:e.target.value})
    }

    const onchangeType = (val) => {
        setFormData({...formData, type: val})
    }

    const onSave = () => {
        if (formData.name.length===0 || (formData.type!=="exact" && formData.type!=="dynamic")) {
            toast.error("Fill All the Fields!");
        } else {
            onSuccess({name: formData.name, isExact: formData.type==='exact'});
            setFormData(INITIAL_VALUE)
        }
    }

    useEffect(() => {
        if(data) {
            setFormData(
                {
                    name: data.name, 
                    type: data.isExact?"exact":"dynamic"
                }
            )
        }
    }, [data])
    

    return (
        <>
            <CustomModal.Body className="px-5">
                <h5>Add New Field</h5>
                <hr />
                <FormInput 
                    label="Name"
                    name="name"
                    type="text"
                    handlechange={onchange}
                    value={formData.name}
                    isRequired
                    text="No space allowed for the key field."
                />
                <FormInput 
                    label="Type"
                    name="isExact"
                    element={
                        <Row>
                            <Col>
                                <FieldBox 
                                    isActive={formData.type==="exact"}
                                    item={
                                        {
                                            "name": "Exact",
                                            "icon": <Check2Circle fill='#198754' />,
                                            "tagline": "Exact value for the current Field"
                                        }
                                    }
                                    handleClick={() => onchangeType("exact")}
                                />
                            </Col>
                            <Col>
                                <FieldBox 
                                    isActive={formData.type==="dynamic"}
                                    item={
                                        {
                                            "name": "Dynamic",
                                            "icon": <Infinity />,
                                            "tagline": "Dynamic Value or validations"
                                        }
                                    }
                                    handleClick={() => onchangeType("dynamic")}
                                />
                            </Col>
                        </Row>
                    }
                    isRequired
                />
            </CustomModal.Body>
            <CustomModal.Footer>
                <NextButton 
                    disabled={formData.name.length===0 || (formData.type!=="exact" && formData.type!=="dynamic")}
                    handleClick={onSave}
                />
            </CustomModal.Footer>
        </>
    )
}

export default AddKeyField;