import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { SubComponentsNav } from 'Components/ProjectsComponent';
import { AddNewTeststep, TeststepViewComponent } from 'Components/ProjectsComponent/TeststepComponents';
import { addTeststepsRequest, editTeststepsRequest, getTeststepsRequest } from 'store/Teststeps/actions';
import { addTestdataRequest, getTestdataRequest } from 'store/Testdata/actions';
import { getEndpointsRequest } from 'store/Endpoints/actions';
import { getHeadersRequest } from 'store/Headers/actions';
import { getPayloadsRequest } from 'store/Payloads/actions';

const mapState = ({ endpoints, headers, payloads, teststeps, testdata }) => ({
    teststeps: teststeps.teststeps,
    isLoading: teststeps.isLoading,
    testdata: testdata.testdata,
    endpoints: endpoints.endpoints,
    headers: headers.headers,
    payloads: payloads.payloads
})

const INITIAL_TESTSTEP_FORM_DATA = {
    name: "",
    method: "",
    endpoint_id: "",
    header_id: "",
    payload_id: ""
}

const INITIAL_TESTDATA_FORM_DATA = {
    teststep: '',
    name: '',
    payload: JSON.stringify({}),
    parameters: {"": ""},
    expected_outcome: []
}

const TeststepContainer = (props) => {
    let dispatch = useDispatch();
    let navigate = useNavigate();

    const { cat } = props;
    const { projectName, id } = useParams();
    const { 
        endpoints, 
        headers, 
        payloads, 
        teststeps,
        isLoading, 
        testdata 
    } = useSelector(mapState);

    const [selectedItem, setSelectedItem] = useState({});
    const [teststepFormData, setTeststepFormData] = useState({ ...INITIAL_TESTSTEP_FORM_DATA, project: projectName });
    const [testdataFormData, setTestdataFormData] = useState({ ...INITIAL_TESTDATA_FORM_DATA });
    const [showAddTestdataForm, setShowAddTestdataForm] = useState(false);
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

    useEffect(() => {
        // get all teststeps, endpoints, headers, payloads
        dispatch(getTeststepsRequest({project: projectName}));
        dispatch(getEndpointsRequest({project: projectName}))
        dispatch(getHeadersRequest({project: projectName}))
        dispatch(getPayloadsRequest({project: projectName}))
    }, [projectName])

    useEffect(() => {
        setSelectedItem(teststeps.filter(e => e.id==id)[0]);
        dispatch(getTestdataRequest({teststep: id}));
    }, [teststeps, id])
    
    useEffect(() => {
        // set options to react-select format {value: "", label: ""}
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

        setOptions(p => ({
            ...p, 
            endpoints: endpoints_data, 
            headers: headers_data, 
            payloads: payloads_data
        }))
    }, [endpoints, headers, payloads])

    const handleFormDataChange = (key, value) => {
        // Accepts key, value
        setTeststepFormData(p => ({
            ...p,
            [key]: value
        }))
    }

    const handleTeststepFormSubmit = (e) => {
        // submit the form
        e.preventDefault();
        if(cat==='add') {
            dispatch(addTeststepsRequest(teststepFormData))
        } else {
            dispatch(editTeststepsRequest(teststepFormData))
        }
    }

    useEffect(() => {
        setTeststepFormData(p => ({
            ...p,
            name: selectedItem?.name || INITIAL_TESTSTEP_FORM_DATA.name,
            id: selectedItem?.id || INITIAL_TESTSTEP_FORM_DATA.id,
            method: selectedItem?.method || INITIAL_TESTSTEP_FORM_DATA.method,
            endpoint_id: selectedItem?.endpoint_id || INITIAL_TESTSTEP_FORM_DATA.endpoint_id,
            header_id: selectedItem?.header_id || INITIAL_TESTSTEP_FORM_DATA.header_id,
            payload_id: selectedItem?.payload_id || INITIAL_TESTSTEP_FORM_DATA.payload_id
        }))
    }, [selectedItem])
    
    const toggleAddTestdataForm = () => {
        setShowAddTestdataForm(!showAddTestdataForm);
    }

    const handleTestdataFormChange = (key, value) => {
        setTestdataFormData(p => ({
            ...p,
            [key]: value
        }))
    }

    const handleTestdataFormSubmit = (e) => {
        e.preventDefault();
        dispatch(addTestdataRequest({...testdataFormData, payload: JSON.parse(testdataFormData.payload)}));
        toggleAddTestdataForm();
    }

    useEffect(() => {
        setTestdataFormData(p => ({
            ...p,
            teststep: selectedItem?.id || INITIAL_TESTDATA_FORM_DATA.id,
            payload: JSON.stringify(selectedItem?.payload?.payload || INITIAL_TESTDATA_FORM_DATA.payload),
            parameters: selectedItem?.payload?.parameters || INITIAL_TESTDATA_FORM_DATA.parameters,
            expected_outcome: selectedItem?.payload?.expected_outcome || INITIAL_TESTDATA_FORM_DATA.expected_outcome
        }))
    }, [selectedItem])
    
    

    return (
        <>
            <SubComponentsNav 
                title="Teststeps"
                data={teststeps}
                isLoading={isLoading}
                onAddBtnClick={() => navigate(`/project/${projectName}/teststeps/new`)}
                onSelectItemUrl={`/project/${projectName}/teststeps`}
            />
            {cat?(
                <AddNewTeststep 
                    cat={cat}
                    isLoading={isLoading}
                    data={teststepFormData}
                    onchange={handleFormDataChange}
                    options={options}
                    handleSubmit={handleTeststepFormSubmit}
                />
            ):(
                <TeststepViewComponent 
                    isLoading={isLoading}
                    data={selectedItem}
                    projectName={projectName}
                    testdata={testdata}
                    showAddTestdataForm={showAddTestdataForm}
                    toggleAddTestdataForm={toggleAddTestdataForm}
                    testdataFormData={testdataFormData}
                    onTestdataFormChange={handleTestdataFormChange}
                    onTestdataFormSubmit={handleTestdataFormSubmit}
                />
            )}
        </>
    )
}

export default TeststepContainer;

TeststepContainer.propTypes = {
    cat: PropTypes.oneOf(["add", "edit"])
}
