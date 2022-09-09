import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { addTestsuitesRequest, editTestsuitesRequest, getTestsuitesRequest } from 'store/Testsuites/actions';
import { SubComponentsNav } from 'Components/ProjectsComponent';
import { AddNewTestsuite, TestsuiteViewComponent } from 'Components/ProjectsComponent/TestsuiteComponents';
import { getEnvironmentsRequest } from 'store/Environments/actions';
import { addExecuteRequest, clearExecutionFailure } from 'store/Execute/actions';
import { getTeststepsRequest } from 'store/Teststeps/actions';
import { GetDiffOfArrayOfObjects } from 'utils';

const mapState = ({ testsuites, environments, execute, testcases }) => ({
    testsuites: testsuites.testsuites,
    isLoading: testsuites.isLoading,
    environments: environments.environments,
    isEnvironmentsLoading: environments.isLoading,
    isExecuteFailed: execute.isError,
    testcases: testcases.testcases
})

const INITIAL_TESTSUITE_FORM_DATA = {
    name: "",
    description: "",
    array_of_testcases: []
}

const TestcaseContainer = (props) => {
    let dispatch = useDispatch();
    let navigate = useNavigate();
    
    const { cat } = props;
    const { projectName, id } = useParams();
    const { testsuites, isLoading, environments, isEnvironmentsLoading, isExecuteFailed, testcases } = useSelector(mapState);
    
    const [testsuiteFormData, setTestsuiteFormData] = useState({ ...INITIAL_TESTSUITE_FORM_DATA, project: projectName })
    const [selectedItem, setSelectedItem] = useState({});
    const [options, setOptions] = useState(
        {
            initialOptions: [],
            updatedOptions: []
        }
    );
    const [selectedTestcases, setSelectedTestcases] = useState([]);

    useEffect(() => {
        dispatch(getTestsuitesRequest({ project: projectName }));
        dispatch(getEnvironmentsRequest({ project: projectName }));
        dispatch(getTeststepsRequest({ project: projectName }))
        dispatch(clearExecutionFailure())
    }, [projectName])

    useEffect(() => {
        setSelectedItem(testsuites.filter(e => e.id==id)[0]);
    }, [testsuites, id])

    useEffect(() => {
        let options_data = []
        testcases.forEach(ele => {
            options_data.push({value: ele.id, label: ele.name})
        })
        setOptions({
            initialOptions: options_data, 
            updatedOptions: options_data
        });
    }, [testcases])

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
        setTestsuiteFormData((prevState) => ({
            ...prevState,
            array_of_testcases: selectedTestcases.map(e => e.value)
        }))
    }, [selectedTestcases])

    useEffect(() => {
        setTestsuiteFormData(p => (
            {
                ...p,
                name: selectedItem?.name || INITIAL_TESTSUITE_FORM_DATA.name,
                id: selectedItem?.id || INITIAL_TESTSUITE_FORM_DATA.id,
                description: selectedItem?.description || INITIAL_TESTSUITE_FORM_DATA.description,
                array_of_testcases: selectedItem?.testcases?.map(e => e.id) || INITIAL_TESTSUITE_FORM_DATA.array_of_testcases
            }
        ))
        let selected_testcases = []
        selectedItem?.testcases?.forEach(ele => {
            selected_testcases.push({value: ele.id, label: ele.name})
        })
        setSelectedTestcases(selected_testcases);
    }, [selectedItem])

    const handleExecute = (testsuite, environment) => {
        dispatch(addExecuteRequest({ testsuite, environment, data: selectedItem }));
        navigate(`/project/${projectName}/execute/${testsuite}`)
    }

    const onRemoveSelectedTestcase = (index) => {
        setSelectedTestcases(prevState => {
            let fields = prevState.filter(function(_value, ind) {
                return ind!==index
            })
            return fields;
        })
    }

    const onSelectedTestcasesChange = (_name, value) => {
        setSelectedTestcases((prevState) => (
            [
                ...prevState, 
                value[0]
            ]
        ))
    }

    const handleTestsuiteFormDataChange = (key, value) => {
        setTestsuiteFormData(p => ({
            ...p,
            [key]: value
        }))
    }

    const handleSubmitTestsuiteFormData = (e) => {
        e.preventDefault();
        if(cat==='add'){
            dispatch(addTestsuitesRequest(testsuiteFormData))
        } else {
            dispatch(editTestsuitesRequest(testsuiteFormData))
        }
    }


    return !isExecuteFailed && (
        <>
            <SubComponentsNav 
                title="Testsuites"
                data={testsuites}
                isLoading={isLoading}
                onAddBtnClick={() => navigate(`/project/${projectName}/testsuites/new`)}
                onSelectItemUrl={`/project/${projectName}/testsuites`}
            />
            {cat?(
                <AddNewTestsuite 
                    cat={cat}
                    isLoading={isLoading}
                    data={testsuiteFormData}
                    testcasesOptions={options}
                    selectedTestcases={selectedTestcases}
                    onchange={handleTestsuiteFormDataChange}
                    onRemoveSelectedTestcase={onRemoveSelectedTestcase}
                    onSelectedTestcaseOrderChange={setSelectedTestcases}
                    onSelectedTestcasesChange={onSelectedTestcasesChange}
                    onSubmit={handleSubmitTestsuiteFormData}
                />
            ):(
                <TestsuiteViewComponent 
                    isLoading={isLoading}
                    data={selectedItem}
                    projectName={projectName}
                    environments={environments}
                    isEnvironmentsLoading={isEnvironmentsLoading}
                    handleExecute={handleExecute}
                />
            )}
        </>
    )
}

export default TestcaseContainer;

TestcaseContainer.propTypes = {
    cat: PropTypes.oneOf(['add', 'edit'])
}
