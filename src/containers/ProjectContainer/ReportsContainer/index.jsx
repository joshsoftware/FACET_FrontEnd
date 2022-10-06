import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import AllReports from 'Components/ProjectsComponent/ReportsComponent/AllReports';
import SingleTestcaseReport from 'Components/ProjectsComponent/ReportsComponent/SingleTestcaseReport';
import ShowTestdataCombinationReport from 'Components/ProjectsComponent/ReportsComponent/ShowTestdataCombinationReport';
import { 
    getReportsRequest, 
    getSingleTeststepOfTestcaseReportRequest, 
    getSingleTestcaseReportRequest 
} from 'store/Reports/actions';

const mapState = ({ reports }) => ({
    reports: reports.reports,
    isReportsLoading: reports.isReportsLoading,
    isOneReportLoading: reports.isOneReportLoading,
    singleReport: reports.singleReport,
    isOneTeststepReportLoading: reports.isOneTeststepReportLoading,
    singleTeststepReport: reports.singleTeststepReport
})

const ReportsContainer = () => {
    let dispatch = useDispatch();
    let navigate = useNavigate();

    const { projectName, reportId, tname } = useParams();
    const { 
        isReportsLoading, 
        isOneReportLoading, 
        isOneTeststepReportLoading,
        reports, 
        singleReport,
        singleTeststepReport
    } = useSelector(mapState);

    useEffect(() => {
        dispatch(getReportsRequest({ project: projectName }))
    }, [projectName])
    
    useEffect(() => {
        if(!isReportsLoading && reportId) {
            dispatch(getSingleTestcaseReportRequest({reportId}))
        }
    }, [reports, reportId])

    useEffect(() => {
        if(!isOneReportLoading && tname) {
            dispatch(getSingleTeststepOfTestcaseReportRequest({testcaseName: tname}))
        }
    }, [singleReport, tname])

    return (
        tname?(
            <ShowTestdataCombinationReport
                data={singleTeststepReport}
                isLoading={isOneTeststepReportLoading}
                projectName={projectName}
            />
        ):(
            reportId?(
                <SingleTestcaseReport 
                    data={singleReport}
                    isLoading={isOneReportLoading}
                    projectName={projectName}
                    onNavigate={navigate}
                />
            ):(
                <AllReports 
                    data={reports}
                    isLoading={isReportsLoading}
                    projectName={projectName}
                    onNavigate={navigate}
                />
            )
        )
    )
}

export default ReportsContainer;
