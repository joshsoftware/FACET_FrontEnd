import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Accordion } from 'react-bootstrap';
import { toast } from 'react-toastify';

import FormInput from 'Components/forms/Inputs/FormInput';
import ExpectedOutcomeTable from 'Components/ProjectsComponent/ExpectedOutcomeTable/index';
import { SaveButton } from 'Components/forms/Buttons/index';

const ExpOutcomeAccordion = ({ data, onChange, eventKey }) => {
    const [formData, setFormData] = useState(data);

    const onchange = (name, val) => {
        setFormData(p => ({
            ...p,
            [name]: val
        }))
    }

    const onSave = () => {
        onChange(formData);
        toast.success("Expected Outcome Saved Successfully!");
    }
    

    return (
        <Accordion.Item eventKey={eventKey}>
            <Accordion.Header>{formData?.name}</Accordion.Header>
            <Accordion.Body>
                <FormInput 
                    label={"Expected Outcome"}
                    element={
                        <ExpectedOutcomeTable 
                            data={formData.expected_outcome}
                            onchange={res => onchange('expected_outcome', res)}
                        />
                    }
                    isRequired
                />
                <div className="d-flex justify-content-end">
                    <SaveButton 
                        size={'sm'}
                        handleClick={onSave}
                        type="button"
                    />
                </div>
            </Accordion.Body>
        </Accordion.Item>
    )
}

export default ExpOutcomeAccordion;

ExpOutcomeAccordion.propTypes = {
    data: PropTypes.object,
    onChange: PropTypes.func,
    eventKey: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ])
}
