import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  getReportDetailRequest,
  getTeststepReportRequest,
} from "store/Reports/actions";
import ReportDetails from "Components/ProjectsComponent/ReportsComponent/ReportDetails";
import TeststepReportDetails from "Components/ProjectsComponent/ReportsComponent/TeststepReportDetails";

import { getReportDetails } from "utils/reportsHelper";

const mapState = ({ reports }) => ({
  level: reports.singleReport.level,
  reportDetail: reports.singleReport.result,
  isReportLoading: reports.isOneReportLoading,
  showTeststepReport: reports.showTeststepReport,
  teststepReport: reports.singleTeststepReport,
});

const ReportDetailsContainer = () => {
  const dispatch = useDispatch();
  const { reportId } = useParams();
  const { reportDetail, level, showTeststepReport, teststepReport } =
    useSelector(mapState);

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

  return showTeststepReport ? (
    <TeststepReportDetails data={teststepReport} />
  ) : (
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
