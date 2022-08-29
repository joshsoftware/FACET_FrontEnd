import React, { useEffect, useState } from 'react'
import { Button, Form, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getEnvironmentsRequest } from '../../../store/Environments/actions';
import { addScheduleRequest } from '../../../store/Schedule/actions';
import { getTestsuitesRequest } from '../../../store/Testsuites/actions';
import { ViewComponent } from '../../CustomComponents';
import { FormInput, FormSelect } from '../../forms/Inputs';
import SetCustomTimeInput from './components/SetCustomTimeInput';


const mapState = ({ testsuites, environments }) => ({
    testsuites: testsuites.testsuites,
    environments: environments.environments,
})

const AddNewSchedule = () => {
    const { projectName } = useParams();
    const [formData, setFormData] = useState({
        testsuite: "",
        environment: "",
        startDateTime: "",
        frequency_type: "",
        frequency_value: {
            years : 0,
            months : 0,
            weeks : 0,
            days : 0,
            hours : 0,
            minutes : 0,
            seconds : 0
        },
        endDateTime: "",
        project: projectName
    });
    const [options, setOptions] = useState(
        {
            testsuites: [],
            environments: [],
            frequecyTypes: ['oneTime', 'daily', 'weekly', 'bi-weekly', 'monthly', 'custom']
        }
    );

    const { testsuites, environments } = useSelector(mapState);
    let dispatch = useDispatch();

    // on form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        const { frequency_value, ...otherFormData } = formData;
        dispatch(addScheduleRequest({
            ...otherFormData,
            startDateTime: new Date(otherFormData.startDateTime).getTime()/1000,
            endDateTime: new Date(otherFormData.endDateTime).getTime()/1000,
            frequency: frequency_value
        }))
    }

    // on change input
    const onchange = (e) => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
    // on FormSelect Changes
    const onSelectChange = (name, value) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    // request testsuites and environments
    useEffect(() => {
        dispatch(getTestsuitesRequest({project: projectName}));
        dispatch(getEnvironmentsRequest({project: projectName}))
    }, [projectName])

    // Set Options when testsuites and environments gets
    useEffect(() => {
        let testsuite_options = [];
        let environment_options = [];

        testsuites.forEach(ele => {
            testsuite_options.push({value: ele.id, label: ele.name})
        })

        environments.forEach(ele => {
            environment_options.push({value: ele.id, label: ele.name})
        })

        setOptions(p => ({...p, testsuites: testsuite_options, environments: environment_options}));
    }, [testsuites, environments])
    
    return (
        <Form onSubmit={handleSubmit}>
            <ViewComponent
                title="Schedule New Testsuite"
                type="save"
                onSave={handleSubmit}
                onSaveDisabled={!formData.testsuite || !formData.environment || formData.frequency_type.length===0 || formData.startDateTime.length===0}
            >
                <Row>
                    <FormSelect 
                        label='Testsuite'
                        options={options.testsuites}
                        handlechange={onSelectChange}
                        className='col-md-6'
                        value={formData.testsuite}
                        name="testsuite"
                        isRequired
                    />
                    <FormSelect 
                        label='Environment'
                        options={options.environments}
                        handlechange={onSelectChange}
                        className='col-md-6'
                        value={formData.environment}
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
                                        variant={formData.frequency_type===item?'success':'primary'}
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

                    {formData.frequency_type==='custom'&&(
                        <div className='col-md-12 alert-secondary rounded py-2 mb-3'>
                            <SetCustomTimeInput 
                                value={formData.frequency_value}
                                handleChange={(value) => onSelectChange('frequency_value', value)}
                            />
                        </div>
                    )}

                    {formData.frequency_type&&(
                        <>
                            <FormInput 
                                label="Start Date/Time"
                                type="datetime-local"
                                className='col-md-6'
                                value={formData.startDateTime}
                                name="startDateTime"
                                handlechange={onchange}
                                isRequired
                            />
                            {formData.frequency_type!=="oneTime"&&(
                                <FormInput 
                                    label="End Date/Time"
                                    type="datetime-local"
                                    className='col-md-6'
                                    value={formData.endDateTime}
                                    name="endDateTime"
                                    handlechange={onchange}
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