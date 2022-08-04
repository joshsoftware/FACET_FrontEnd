import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ViewComponent } from '../../CustomComponents';
import { FormInput } from '../../forms/Inputs';
import Select from 'react-select';
import { getTestcasesRequest } from '../../../store/Testcases/actions';
import { addTestsuitesRequest } from '../../../store/Testsuites/actions';
import { ConvertToSlug } from '../../../utils';

const mapState = ({ testcases }) => ({
    testcases: testcases.testcases
})

const AddNewTestsuite = () => {
    const { projectName } = useParams();
    let dispatch = useDispatch();
    const { testcases } = useSelector(mapState);
    const [formData, setFormData] = useState(
        {
            project: projectName,
            name: "",
            description: "",
            array_of_testcases: []
        }
    )
    const [options, setOptions] = useState([]);

    useEffect(() => {
        dispatch(getTestcasesRequest({ project: projectName }))
    }, [projectName])
    

    useEffect(() => {
        let options_data = []

        testcases.forEach(ele => {
            options_data.push({value: ele.id, label: ele.name})
        })
        setOptions(options_data);
    }, [testcases])
    

    const onchange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addTestsuitesRequest(formData))
    }

    return (
        <Form className='w-100' onSubmit={handleSubmit}>
            <ViewComponent
                title="Add New"
                type="save"
                onSave={handleSubmit}
            >
                <FormInput 
                    label="Name"
                    placeholder="Name"
                    name="name"
                    value={formData.name}
                    handlechange={onchange}
                    isRequired
                    text={formData.name.length!==0&&`Your testsuite will created as ${ConvertToSlug(formData.name)}`}
                />
                <FormInput 
                    type="textarea"
                    rows={2}
                    label="Description"
                    placeholder="Write short description here..."
                    name="description"
                    value={formData.description}
                    handlechange={onchange}
                />
                {console.log(formData)}
                <FormInput 
                    label="Testcases"
                    text="You may select multiple testcases"
                    element={
                        <Select 
                            isMulti
                            options={options}
                            onChange={e => setFormData({...formData, array_of_testcases: e.map(data => data.value)})}
                        />
                    }
                    isRequired
                />
            </ViewComponent>
        </Form>
    )
}

export default AddNewTestsuite;