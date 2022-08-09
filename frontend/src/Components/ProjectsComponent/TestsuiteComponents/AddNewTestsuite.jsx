import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ViewComponent } from '../../CustomComponents';
import { FormInput, FormSelect } from '../../forms/Inputs';
import { getTestcasesRequest } from '../../../store/Testcases/actions';
import { addTestsuitesRequest, editTestsuitesRequest } from '../../../store/Testsuites/actions';
import { ConvertToSlug } from '../../../utils';

const mapState = ({ testcases }) => ({
    testcases: testcases.testcases
})

const AddNewTestsuite = ({ cat, data }) => {
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

    const onSelectChange = (name, value) => {
        console.log(value)
        setFormData(p => (
            {
                ...p,
                [name]: value
            }
        ))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(cat==='add'){
            dispatch(addTestsuitesRequest(formData))
        } else {
            dispatch(editTestsuitesRequest(formData))
        }
    }

    useEffect(() => {
        if(cat==='edit') {
            setFormData(p => (
                {
                    ...p,
                    name: data.name,
                    id: data.id,
                    description: data.description,
                    array_of_testcases: data.testcases
                }
            ))
        }
    }, [data])

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
                    text={formData.name.length!==0&&`Your testsuite will created as ${ConvertToSlug(formData.name)}`}
                    isRequired
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
                <FormSelect
                    label="Testcases"
                    text="You may select multiple testcases"
                    name="array_of_testcases"
                    options={options}
                    handlechange={onSelectChange}
                    value={formData.array_of_testcases}
                    isRequired
                    isMulti
                />
            </ViewComponent>
        </Form>
    )
}

export default AddNewTestsuite;