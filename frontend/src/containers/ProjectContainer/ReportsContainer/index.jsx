import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import AllReports from '../../../Components/ProjectsComponent/ReportsComponent/AllReports';
import SingleTestsuiteReport from '../../../Components/ProjectsComponent/ReportsComponent/SingleTestsuiteReport';
import { getReportsRequest, getSingleTestsuiteReportRequest } from '../../../store/Reports/actions';

const mapState = ({ reports }) => ({
    reports: reports.reports,
    isReportsLoading: reports.isReportsLoading,
    isOneReportLoading: reports.isOneReportLoading,
    singleReport: reports.singleReport
})

const ReportsContainer = () => {
    let dispatch = useDispatch();
    const { projectName, reportId } = useParams();
    const { 
        isReportsLoading, 
        isOneReportLoading, 
        reports, 
        singleReport 
    } = useSelector(mapState);

    useEffect(() => {
        dispatch(getReportsRequest({ project: projectName }))
    }, [projectName])
    
    useEffect(() => {
        if(!isReportsLoading && reportId) {
            dispatch(getSingleTestsuiteReportRequest({reportId}))
        }
    }, [reports, reportId])
    
    return (
        reportId?(
            <SingleTestsuiteReport 
                data={singleReport}
                isLoading={isOneReportLoading}
            />
        ):(
            <AllReports 
                data={reports}
                isLoading={isReportsLoading}
            />
        )
    )
}

export default ReportsContainer;