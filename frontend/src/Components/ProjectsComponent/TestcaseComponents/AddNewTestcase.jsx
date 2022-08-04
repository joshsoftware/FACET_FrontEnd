import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ViewComponent } from '../../CustomComponents';
import { FormInput, FormSelect } from '../../forms/Inputs';
import { getEndpointsRequest } from '../../../store/Endpoints/actions';
import { getHeadersRequest } from '../../../store/Headers/actions';
import { getPayloadsRequest } from '../../../store/Payloads/actions';
import { addTestcasesRequest } from '../../../store/Testcases/actions';
import { ConvertToSlug } from '../../../utils';
import Select from 'react-select';

const mapState = ({ endpoints, headers, payloads }) => ({
    endpoints: endpoints.endpoints,
    headers: headers.headers,
    payloads: payloads.payloads
})

const AddNewTestcase = () => {
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
            endpoints: [],
            headers: [],
            payloads: []
        }
    );

    const onchange = (e) => {
        setFormData(p => ({...p, [e.target.name]:e.target.value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addTestcasesRequest(formData))
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
                    text={formData.name.length!==0&&`Your testcase will created as ${ConvertToSlug(formData.name)}`}
                />
                <FormSelect 
                    label="Method"
                    name="method"
                    options={[['GET', 'GET'], ['POST', 'POST'], ['PUT', 'PUT'], ['PATCH', 'PATCH'], ['DELETE', 'DELETE']]}
                    value={formData.method}
                    handlechange={onchange}
                    isRequired
                />
                <FormInput 
                    label="Endpoint"
                    element={
                        <Select 
                            options={options.endpoints}
                            onChange={e => setFormData({...formData, endpoint_id: e.value})}
                        />
                    }
                    isRequired
                />
                <FormInput 
                    label="Header"
                    element={
                        <Select 
                            options={options.headers}
                            onChange={e => setFormData({...formData, header_id: e.value})}
                        />
                    }
                    isRequired
                />
                <FormInput 
                    label="Payload"
                    element={
                        <Select 
                            options={options.payloads}
                            onChange={e => setFormData({...formData, payload_id: e.value})}
                        />
                    }
                    isRequired
                />
            </ViewComponent>
        </Form>
    )
}

export default AddNewTestcase;