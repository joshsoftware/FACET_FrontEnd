import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { getTestcasesRequest } from 'store/Testcases/actions';
import { getEnvironmentsRequest } from 'store/Environments/actions';
import { addScheduleRequest, getAllSchedulesRequest } from 'store/Schedule/actions';
import { AddNewSchedule, ScheduleViewComponent } from 'Components/ProjectsComponent/ScheduleComponents';

const mapState = ({ schedules, testsuites, environments }) => ({
    isLoading: schedules.isLoading,
    scheduledSuites: schedules.scheduledSuites,
    testsuites: testsuites.testsuites,
    environments: environments.environments,
})

const INITIAL_SCHEDULE_FORM_DATA = {
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
    endDateTime: ""
}

const ScheduleContainer = (props) => {
    let dispatch = useDispatch();
    let navigate = useNavigate();

    const { cat } = props;
    const { projectName } = useParams();
    const { isLoading, scheduledSuites, testsuites, environments } = useSelector(mapState);

    const [addNewScheduleFormData, setAddNewScheduleFormData] = useState({ ...INITIAL_SCHEDULE_FORM_DATA, project: projectName });
    const [options, setOptions] = useState({
        testsuites: [],
        environments: [],
        frequecyTypes: ['oneTime', 'daily', 'weekly', 'bi-weekly', 'monthly', 'custom']
    });

    useEffect(() => {
        dispatch(getAllSchedulesRequest({ project: projectName }));
        dispatch(getTestcasesRequest({project: projectName}));
        dispatch(getEnvironmentsRequest({project: projectName}));
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

    const handleFormDataChange = (name, value) => {
        setAddNewScheduleFormData(p => ({
            ...p,
            [name]: value
        }))
    }

    // on form submit
    const handleFormDataSubmit = (e) => {
        e.preventDefault();
        const { frequency_value, ...otherFormData } = addNewScheduleFormData;
        dispatch(addScheduleRequest({
            ...otherFormData,
            startDateTime: new Date(otherFormData.startDateTime).getTime()/1000,
            endDateTime: new Date(otherFormData.endDateTime).getTime()/1000,
            frequency: frequency_value
        }))
    }

    return (
        <div className='w-100'>
            {cat?(
                <AddNewSchedule 
                    cat={cat}
                    isLoading={isLoading}
                    projectName={projectName}
                    data={addNewScheduleFormData}
                    onChange={handleFormDataChange}
                    onSubmit={handleFormDataSubmit}
                    options={options}
                    />  
            ):(
                <ScheduleViewComponent 
                    data={scheduledSuites}
                    isLoading={isLoading}
                    onNavigate={navigate}
                />
            )}
        </div>
    )
}

export default ScheduleContainer;

ScheduleContainer.propTypes = {
    cat: PropTypes.string
}
