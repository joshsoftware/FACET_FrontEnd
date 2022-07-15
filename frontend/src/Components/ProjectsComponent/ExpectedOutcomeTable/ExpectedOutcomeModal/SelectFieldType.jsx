import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { 
    At, 
    Braces, 
    Calendar, 
    Icon123, 
    List, 
    ToggleOn, 
    Type 
} from 'react-bootstrap-icons';
import { CustomModal } from '../../../CustomComponents';
import './style.css';

const SelectFieldType = () => {
    const fieldTypes = [
        {
            name: "text",
            icon: <Type />,
            tagline: "Small or long text with validations"
        },
        {
            name: "email",
            icon: <At />,
            tagline: "Email Field with validations format"
        },
        {
            name: "number",
            icon: <Icon123 />,
            tagline: "Numbers and range of numbers"
        },
        {
            name: "boolean",
            icon: <ToggleOn />,
            tagline: "Yes or no, 1 or 0, true or false"
        },
        {
            name: "dateTime",
            icon: <Calendar />,
            tagline: "Date, Time or DateTime validations"
        },
        {
            name: "array",
            icon: <List />,
            tagline: "List of data items"
        },
        {
            name: "object",
            icon: <Braces />,
            tagline: "Data in object or JSON format"
        }
    ]

    const [activeField, setActiveField] = useState();

    const handleClick = (index) => {
        setActiveField(index+1)
    }

    return (
        <>
            <CustomModal.Body className="px-5">
                <h5>Select a Field Type</h5>
                <hr />
                <Row>
                    {fieldTypes.map((item, index) => {
                        return (
                            <Col md={6} key={index}>
                                <div 
                                    className={`border rounded my-1 px-4 py-3 d-flex align-items-center fieldType ${activeField===index+1&&'active'}`}
                                    onClick={() => handleClick(index)}
                                >
                                    <div className={`border d-flex px-2 py-1 rounded fieldTypeIcon-${item.name}`}>
                                        {item.icon}
                                    </div>
                                    <div className='ps-3'>
                                        <strong className='text-capitalize'>{item.name}</strong>
                                        <div>
                                            <small>{item.tagline}</small>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        )
                    })}
                </Row>
            </CustomModal.Body>
        </>
    )
}

export default SelectFieldType;