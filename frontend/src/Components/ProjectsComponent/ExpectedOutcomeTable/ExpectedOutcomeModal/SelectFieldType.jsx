import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { 
    At, 
    // Braces, 
    Calendar, 
    Icon123, 
    // List, 
    ToggleOn, 
    Type 
} from 'react-bootstrap-icons';
import { CustomModal } from '../../../CustomComponents';
import FieldBox from './components/FieldBox';

const SelectFieldType = ({ onSuccess }) => {
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
        // {
        //     name: "array",
        //     icon: <List />,
        //     tagline: "List of data items"
        // },
        // {
        //     name: "object",
        //     icon: <Braces />,
        //     tagline: "Data in object or JSON format"
        // }
    ]

    const [activeField, setActiveField] = useState();

    const handleClick = (index) => {
        setActiveField(index+1);
        onSuccess(fieldTypes[index].name)
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
                                <FieldBox 
                                    isActive={activeField===index+1}
                                    item={item}
                                    handleClick={() => handleClick(index)}
                                />
                            </Col>
                        )
                    })}
                </Row>
            </CustomModal.Body>
        </>
    )
}

export default SelectFieldType;