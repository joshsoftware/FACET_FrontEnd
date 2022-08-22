import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ViewComponent } from '../../CustomComponents';
import { FormInput, FormSelect } from '../../forms/Inputs';
import { getEndpointsRequest } from '../../../store/Endpoints/actions';
import { getHeadersRequest } from '../../../store/Headers/actions';
import { getPayloadsRequest } from '../../../store/Payloads/actions';
import { addTestcasesRequest, editTestcasesRequest } from '../../../store/Testcases/actions';
import { ConvertToSlug } from '../../../utils';

const mapState = ({ endpoints, headers, payloads }) => ({
    endpoints: endpoints.endpoints,
    headers: headers.headers,
    payloads: payloads.payloads
})

const AddNewTestcase = ({ cat, data }) => {
    const { projectName } = useParams();
    let dispatch = useDispatch();
    const { endpoints, headers, payloads } = useSelector(mapState);
    const [formData, setFormData] = useState(
        {
            project: projectName,
            name: "",
            method: "",
            endpoint_id: "",
            header_id: "",
            payload_id: ""
        }
    )
    const [options, setOptions] = useState(
        {
            methods: [
                {value: 'GET', label: 'GET'},
                {value: 'POST', label: 'POST'},
                {value: 'PUT', label: 'PUT'},
                {value: 'PATCH', label: 'PATCH'},
                {value: 'DELETE', label: 'DELETE'},
            ],
            endpoints: [],
            headers: [],
            payloads: []
        }
    );

    const onchange = (e) => {
        setFormData(p => (
            {
                ...p, 
                [e.target.name]:e.target.value
            }
        ))
    }

    const onSelectChange = (name, value) => {
        setFormData(p => ({...p, [name]: value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(cat==='add') {
            dispatch(addTestcasesRequest(formData))
        } else {
            dispatch(editTestcasesRequest(formData))
        }
    }

    useEffect(() => {
        dispatch(getEndpointsRequest({project: projectName}))
        dispatch(getHeadersRequest({project: projectName}))
        dispatch(getPayloadsRequest({project: projectName}))
    }, [projectName])
    
    useEffect(() => {
        let endpoints_data = [];
        let headers_data = [];
        let payloads_data = [];

        endpoints.forEach(ele => {
            endpoints_data.push({value: ele.id, label: ele.name})
        })
        headers.forEach(ele => {
            headers_data.push({value: ele.id, label: ele.name})
        })
        payloads.forEach(ele => {
            payloads_data.push({value: ele.id, label: ele.name})
        })
        setOptions({...options, endpoints: endpoints_data, headers: headers_data, payloads: payloads_data})
    }, [endpoints, headers, payloads])

    useEffect(() => {
        if(cat==='edit') {
            setFormData(p => ({
                ...p,
                name: data.name,
                id: data.id,
                method: data.method,
                endpoint_id: data.endpoint_id,
                header_id: data.header_id,
                payload_id: data.payload_id
            }))
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
                    text={formData.name.length!==0&&`Your testcase will created as ${ConvertToSlug(formData.name)}`}
                    disabled={cat==='edit'}
                    isRequired
                />
                <FormSelect 
                    label="Method"
                    name="method"
                    options={options.methods}
                    value={formData.method}
                    handlechange={onSelectChange}
                    isRequired
                />
                <FormSelect 
                    label="Endpoint"
                    name="endpoint_id"
                    options={options.endpoints}
                    value={formData.endpoint_id}
                    handlechange={onSelectChange}
                    isRequired
                />
                <FormSelect 
                    label="Header"
                    name="header_id"
                    options={options.headers}
                    value={formData.header_id}
                    handlechange={onSelectChange}
                    isRequired
                />
                <FormSelect 
                    label="Payload"
                    name="payload_id"
                    options={options.payloads}
                    value={formData.payload_id}
                    handlechange={onSelectChange}
                    isRequired
                />
            </ViewComponent>
        </Form>
    )
}

export default AddNewTestcase;