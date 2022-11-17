import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  getReportDetailRequest,
  getTeststepReportRequest,
} from "store/Reports/actions";
import ReportDetails from "Components/ProjectsComponent/ReportsComponent/ReportDetails";

import { getReportDetails } from "utils/reportsHelper";

const mapState = ({ reports }) => ({
  level: reports.singleReport.level,
  reportDetail: reports.singleReport.result,
  isReportLoading: reports.isOneReportLoading,
});

const ReportDetailsContainer = () => {
  const dispatch = useDispatch();
  const { reportId } = useParams();
  const { reportDetail, level } = useSelector(mapState);

  // getReportDetails returns destructuring of results based on level
  const { name, passedFields, failedFields, reportData } = getReportDetails(
    level,
    reportDetail
  );

  useEffect(() => {
    if (reportId) {
      dispatch(getReportDetailRequest({ reportId }));
    }
  }, [reportId]);

  const onTeststepCardClick = (selectedTeststep) => {
    dispatch(getTeststepReportRequest({ teststep: selectedTeststep }));
  };

  return (
    <ReportDetails
      name={name}
      passedFields={passedFields}
      failedFields={failedFields}
      data={reportData}
      level={level}
      onTeststepCardClick={onTeststepCardClick}
    />
  );
};

export default ReportDetailsContainer;
