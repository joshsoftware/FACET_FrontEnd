import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { AddNewTeststep, TeststepViewComponent } from 'Components/ProjectsComponent/TeststepComponents';
import { addTestdataRequest, getTestdataRequest } from 'store/Testdata/actions';
import { addTeststepsRequest, editTeststepsRequest, getTeststepsRequest } from 'store/Teststeps/actions';
import { getEndpointsRequest } from 'store/Endpoints/actions';
import { getHeadersRequest } from 'store/Headers/actions';
import { getPayloadsRequest } from 'store/Payloads/actions';
import { SubComponentsNav } from 'Components/ProjectsComponent';

import {
    INITIAL_TESTSTEP_FORM_DATA,
    INITIAL_TESTDATA_FORM_DATA,
    SELECT_OPTIONS_TESTDATA_FORM
} from 'constants/appConstants';

const mapState = ({ endpoints, headers, payloads, teststeps, testdata }) => ({
    isLoading: teststeps.isLoading,
    endpoints: endpoints.endpoints,
    headers: headers.headers,
    payloads: payloads.payloads,
    testdata: testdata.testdata,
    teststeps: teststeps.teststeps,
});

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
        testdata,
    } = useSelector(mapState);

    const [selectedItem, setSelectedItem] = useState({});
    const [teststepFormData, setTeststepFormData] = useState({ ...INITIAL_TESTSTEP_FORM_DATA, project: projectName });
    const [testdataFormData, setTestdataFormData] = useState({ ...INITIAL_TESTDATA_FORM_DATA });
    const [showAddTestdataForm, setShowAddTestdataForm] = useState(false);
    const [options, setOptions] = useState(SELECT_OPTIONS_TESTDATA_FORM);

    useEffect(() => {
        // get all teststeps, endpoints, headers, payloads
        dispatch(getTeststepsRequest({ project: projectName }));
        dispatch(getEndpointsRequest({ project: projectName }));
        dispatch(getHeadersRequest({ project: projectName }));
        dispatch(getPayloadsRequest({ project: projectName }));
    }, [projectName]);

    useEffect(() => {
        setSelectedItem(teststeps.filter(e => e.id == id)[0] || {});
        dispatch(getTestdataRequest({ teststep: id }));
    }, [teststeps, id]);

    useEffect(() => {
        // set options to react-select format {value: "", label: ""}
        let endpoints_data = [];
        let headers_data = [];
        let payloads_data = [];

        endpoints.forEach(ele => {
            endpoints_data.push({ value: ele.id, label: ele.name });
        });
        headers.forEach(ele => {
            headers_data.push({ value: ele.id, label: ele.name });
        });
        payloads.forEach(ele => {
            payloads_data.push({ value: ele.id, label: ele.name });
        });

        setOptions(p => ({
            ...p,
            endpoints: endpoints_data,
            headers: headers_data,
            payloads: payloads_data,
        }));
    }, [endpoints, headers, payloads]);

    const handleFormDataChange = (key, value) => {
        // Accepts key, value
        setTeststepFormData(p => ({
            ...p,
            [key]: value,
        }));
    };

    const handleTeststepFormSubmit = (e) => {
        // submit the form
        e.preventDefault();
        if (cat === 'add') {
            dispatch(addTeststepsRequest(teststepFormData));
        } else {
            dispatch(editTeststepsRequest(teststepFormData));
        }
    };

    const setInitialTestdata = () => {
        const { id: teststepId, payload } = selectedItem;
        const {
            expected_outcome: initialTDExpOutcome,
            name: initialTDName,
            parameters: initialTDParams,
            payload: initialTDPayload,
            selected_expected_outcome: initialTDSelectedExpOutcome,
            teststep: initialTDId,
        } = INITIAL_TESTDATA_FORM_DATA;

        setTestdataFormData(p => ({
            ...p,
            name: initialTDName,
            teststep: teststepId || initialTDId,
            payload: JSON.stringify(payload?.payload || initialTDPayload),
            parameters: payload?.parameters || initialTDParams,
            expected_outcome: payload?.expected_outcome || initialTDExpOutcome,
            selected_expected_outcome: initialTDSelectedExpOutcome,
        }));
    };

    useEffect(() => {
        // Here ts means teststep
        const { endpoint_id, header_id , id: teststepId, method, name: tsName, payload_id } = selectedItem;
        const {
            endpoint_id: initialTsEndpoint,
            header_id: initialTsHeader,
            id: initialTsId,
            method: initialTsMethod,
            name: initialTsName,
            payload_id: initialTsPayload,
        } = INITIAL_TESTSTEP_FORM_DATA;

        setTeststepFormData(p => ({
            ...p,
            name: tsName || initialTsName,
            id: teststepId || initialTsId,
            method: method || initialTsMethod,
            endpoint_id: endpoint_id || initialTsEndpoint,
            header_id: header_id || initialTsHeader,
            payload_id: payload_id || initialTsPayload,
        }));
        setInitialTestdata();
    }, [selectedItem]);

    const toggleAddTestdataForm = () => {
        setShowAddTestdataForm(!showAddTestdataForm);
        setInitialTestdata();
    };

    const handleTestdataFormChange = (key, value) => {
        setTestdataFormData(p => ({
            ...p,
            [key]: value,
        }));
    };

    const handleTestdataFormSubmit = (e) => {
        e.preventDefault();
        let submitData = {
            ...testdataFormData,
            payload: JSON.parse(testdataFormData.payload),
            expected_outcome: testdataFormData.expected_outcome.find(x => x.name === testdataFormData.selected_expected_outcome)?.expected_outcome,
        };
        delete submitData.selected_expected_outcome;
        dispatch(addTestdataRequest(submitData));
        toggleAddTestdataForm();
    };

    return (
        <>
            <SubComponentsNav
                title="Teststeps"
                data={teststeps}
                isLoading={isLoading}
                onAddBtnClick={() => navigate(`/project/${projectName}/teststeps/new`)}
                onSelectItemUrl={`/project/${projectName}/teststeps`}
            />
            {cat ? (
                <AddNewTeststep
                    cat={cat}
                    isLoading={isLoading}
                    data={teststepFormData}
                    onchange={handleFormDataChange}
                    options={options}
                    handleSubmit={handleTeststepFormSubmit}
                />
            ) : (
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

TeststepContainer.propTypes = {
    cat: PropTypes.oneOf(["add", "edit"])
};

export default TeststepContainer;
