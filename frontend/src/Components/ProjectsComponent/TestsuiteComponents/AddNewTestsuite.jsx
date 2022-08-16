import React, { useCallback, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ViewComponent } from '../../CustomComponents';
import { FormInput, FormSelect } from '../../forms/Inputs';
import { getTestcasesRequest } from '../../../store/Testcases/actions';
import { addTestsuitesRequest, editTestsuitesRequest } from '../../../store/Testsuites/actions';
import { ConvertToSlug, GetDiffOfArrayOfObjects } from '../../../utils';
import DragDropComponent from '../../DragDropComponent';

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
    const [options, setOptions] = useState(
        {
            initialOptions: [],
            updatedOptions: []
        }
    );
    const [selectedTestcases, setSelectedTestcases] = useState([]);

    useEffect(() => {
        dispatch(getTestcasesRequest({ project: projectName }))
    }, [projectName])
    

    useEffect(() => {
        let options_data = []

        testcases.forEach(ele => {
            options_data.push({value: ele.id, label: ele.name})
        })
        setOptions({initialOptions: options_data, updatedOptions: options_data});
    }, [testcases])
    

    const onchange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const onSelectChange = (name, value) => {
        setSelectedTestcases((prevState) => (
            [
                ...prevState, 
                value[0]
            ]
        ))
    }

    const onRemoveSelectedTestcase = (index) => {
        setSelectedTestcases(prevState => {
            let fields = prevState.filter(function(value, ind, arr) {
                return ind!==index
            })
            return fields;
        })
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
        let diff = GetDiffOfArrayOfObjects(
            options.initialOptions, 
            selectedTestcases
        );
        setOptions((prevState) => (
            {
                ...prevState, 
                updatedOptions: diff
            }
        ));
        setFormData((prevState) => ({
            ...prevState,
            array_of_testcases: selectedTestcases.map(e => e.value)
        }))
    }, [selectedTestcases])

    useEffect(() => {
        if(cat==='edit') {
            setFormData(p => (
                {
                    ...p,
                    name: data.name,
                    id: data.id,
                    description: data.description,
                    array_of_testcases: data.testcases.map(e => e.id)
                }
            ))
            let selected_testcases = []
            data.testcases.forEach(ele => {
                selected_testcases.push({value: ele.id, label: ele.name})
            })
            setSelectedTestcases(selected_testcases);
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
                <div>
                    <label>Testcases<span className='text-danger'>*</span></label>
                    <div className='alert-secondary rounded'>
                        <div className='p-2'>
                            <DragDropComponent 
                                data={selectedTestcases}
                                onChange={setSelectedTestcases}
                                itemClass="bg-white px-4 py-2 rounded my-2"
                                dragClass="alert-primary px-4 py-2 rounded"
                                onDelete={(e) => onRemoveSelectedTestcase(e)}
                            />
                        </div>
                        <FormSelect
                            name="array_of_testcases"
                            options={options.updatedOptions}
                            handlechange={onSelectChange}
                            value={selectedTestcases}
                            hideValues
                            isMulti
                            isRequired
                            className="mb-0"
                        />
                    </div>
                </div>

            </ViewComponent>
        </Form>
    )
}

export default AddNewTestsuite;