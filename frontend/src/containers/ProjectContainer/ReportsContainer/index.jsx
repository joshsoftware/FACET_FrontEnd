import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import AllReports from 'Components/ProjectsComponent/ReportsComponent/AllReports';
import SingleTestsuiteReport from 'Components/ProjectsComponent/ReportsComponent/SingleTestsuiteReport';
import ShowTestdataCombinationReport from 'Components/ProjectsComponent/ReportsComponent/ShowTestdataCombinationReport';
import { 
    getReportsRequest, 
    getSingleTestcaseOfTestsuiteReportRequest, 
    getSingleTestsuiteReportRequest 
} from 'store/Reports/actions';

const mapState = ({ reports }) => ({
    reports: reports.reports,
    isReportsLoading: reports.isReportsLoading,
    isOneReportLoading: reports.isOneReportLoading,
    singleReport: reports.singleReport,
    isOneTestcaseReportLoading: reports.isOneTestcaseReportLoading,
    SingleTestcaseReport: reports.SingleTestcaseReport
})

const ReportsContainer = () => {
    let dispatch = useDispatch();
    let navigate = useNavigate();

    const { projectName, reportId, tname } = useParams();
    const { 
        isReportsLoading, 
        isOneReportLoading, 
        isOneTestcaseReportLoading,
        reports, 
        singleReport,
        SingleTestcaseReport
    } = useSelector(mapState);

    useEffect(() => {
        dispatch(getReportsRequest({ project: projectName }))
    }, [projectName])
    
    useEffect(() => {
        if(!isReportsLoading && reportId) {
            dispatch(getSingleTestsuiteReportRequest({reportId}))
        }
    }, [reports, reportId])

    useEffect(() => {
        if(!isOneReportLoading && tname) {
            dispatch(getSingleTestcaseOfTestsuiteReportRequest({testcaseName: tname}))
        }
    }, [singleReport, tname])
    
    
    return (
        tname?(
            <ShowTestdataCombinationReport
                data={SingleTestcaseReport}
                isLoading={isOneTestcaseReportLoading}
            />
        ):(
            reportId?(
                <SingleTestsuiteReport 
                    data={singleReport}
                    isLoading={isOneReportLoading}
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
