import React, { useEffect, useState } from 'react'
import { Button, Form, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getEnvironmentsRequest } from '../../../store/Environments/actions';
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
        frequency: ""
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
        // TODO
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
            [name]: value.value
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
    
    
console.log(formData)
    return (
        <Form onSubmit={handleSubmit}>
            <ViewComponent
                title="Schedule New Testsuite"
                type="save"
                onSave={handleSubmit}
                onSaveDisabled
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
                                        variant={formData.frequency===item?'success':'primary'}
                                        onClick={onchange}
                                        name='frequency'
                                        value={item}
                                    >
                                        {item}
                                    </Button>
                                )
                            })}
                        </div>
                    </div>

                    <div className='col-md-12 alert-secondary rounded py-2'>
                        <SetCustomTimeInput />
                    </div>
                </Row>
                {/* <Row>
                    <FormInput 
                        label="Start Date/Time"
                        type="datetime-local"
                        className='col-md-6'
                        value={formData.startDateTime}
                        name="startDateTime"
                        handlechange={onchange}
                        isRequired
                    />
                    <FormInput 
                        label="End Date/Time"
                        type="datetime-local"
                        className='col-md-6'
                        value={formData.endDateTime}
                        name="endDateTime"
                        handlechange={onchange}
                    />
                </Row> */}
            </ViewComponent>
        </Form>
    )
}

export default AddNewSchedule;