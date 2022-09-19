import React from 'react'
import PropTypes from 'prop-types';
import { Button, Form, Row } from 'react-bootstrap';

import { ViewComponent } from 'Components/CustomComponents';
import { FormInput, FormSelect } from 'Components/forms/Inputs';
import SetCustomTimeInput from './components/SetCustomTimeInput';


const AddNewSchedule = (props) => {
    const {
        isLoading,
        data,
        onChange,
        onSubmit,
        options
    } = props;

    // on change input
    const onchange = (e) => {
        onChange(e.target.name, e.target.value);
    }
    // on FormSelect Changes
    const onSelectChange = (name, value) => {
        onChange(name, value);
    }

    return !isLoading && (
        <Form onSubmit={onSubmit}>
            <ViewComponent
                title="Schedule New Testcase"
                type="save"
                onSave={onSubmit}
                onSaveDisabled={!data.testcase || !data.environment || data.frequency_type.length===0 || data.startDateTime.length===0}
            >
                <Row>
                    <FormSelect 
                        label='Testcase'
                        options={options.testcases}
                        handlechange={onSelectChange}
                        className='col-md-6'
                        value={data.testcase}
                        name="testcase"
                        isRequired
                    />
                    <FormSelect 
                        label='Environment'
                        options={options.environments}
                        handlechange={onSelectChange}
                        className='col-md-6'
                        value={data.environment}
                        name="environment"
                        isRequired
                    />
                    <div className='col-md-12 mb-3'>
                        <label>Frequency<span className='text-danger'>*</span></label>
                        <div className='pt-1'>
                            {options.frequecyTypes.map((item, index) => {
                                return (
                                    <Button 
                                        key={index} 
                                        className="mx-1 text-capitalize" 
                                        size='sm' 
                                        variant={data.frequency_type===item?'success':'primary'}
                                        onClick={onchange}
                                        name='frequency_type'
                                        value={item}
                                    >
                                        {item}
                                    </Button>
                                )
                            })}
                        </div>
                    </div>

                    {data.frequency_type==='custom'&&(
                        <div className='col-md-12 alert-secondary rounded py-2 mb-3'>
                            <SetCustomTimeInput 
                                value={data.frequency_value}
                                handleChange={(value) => onSelectChange('frequency_value', value)}
                            />
                        </div>
                    )}

                    {data.frequency_type&&(
                        <>
                            <FormInput 
                                label="Start Date/Time"
                                type="datetime-local"
                                className='col-md-6'
                                value={data.startDateTime}
                                name="startDateTime"
                                onChange={onchange}
                                isRequired
                            />
                            {data.frequency_type!=="oneTime"&&(
                                <FormInput 
                                    label="End Date/Time"
                                    type="datetime-local"
                                    className='col-md-6'
                                    value={data.endDateTime}
                                    name="endDateTime"
                                    onChange={onchange}
                                />
                            )}
                        </>
                    )}
                </Row>
            </ViewComponent>
        </Form>
    )
}

export default AddNewSchedule;

AddNewSchedule.propTypes = {
    cat: PropTypes.oneOf(['add', 'edit']),
    projectName: PropTypes.string,
    isLoading: PropTypes.bool,
    data: PropTypes.object,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    options: PropTypes.objectOf(
        PropTypes.array
    )
}
