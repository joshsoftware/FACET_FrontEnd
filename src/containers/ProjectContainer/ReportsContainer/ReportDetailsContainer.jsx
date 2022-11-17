import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import {
  getReportDetailRequest,
  getTeststepReportRequest,
} from "store/Reports/actions";
import ReportDetails from "Components/ProjectsComponent/ReportsComponent/ReportDetails";
import TestFieldCommentModal from "Components/ProjectsComponent/ReportsComponent/TestFieldCommentModal";
import TeststepReportDetails from "Components/ProjectsComponent/ReportsComponent/TeststepReportDetails";

import { getReportDetails } from "utils/reportsHelper";

const initialSelectedCommentField = {
  reportId: "",
  testsuite: "",
  testcase: "",
  teststep: "",
  testdata: "",
  field: "",
  status: "",
  updatedStatus: "",
  expectedValue: "",
  responseValue: "",
  project: "",
  comment: "",
};

const mapState = ({ reports }) => ({
  level: reports.singleReport.level,
  reportDetail: reports.singleReport.result,
  isReportLoading: reports.isOneReportLoading,
  showTeststepReport: reports.showTeststepReport,
  teststepReport: reports.singleTeststepReport,
});

const ReportDetailsContainer = () => {
  const dispatch = useDispatch();
  const { projectName, reportId } = useParams();
  const { reportDetail, level, showTeststepReport, teststepReport } =
    useSelector(mapState);

  // getReportDetails returns destructuring of results based on level
  const { name, passedFields, failedFields, reportData } = getReportDetails(
    level,
    reportDetail
  );

  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [selectedCommentField, setSelectedCommentField] = useState(
    initialSelectedCommentField
  );

  useEffect(() => {
    if (reportId) {
      dispatch(getReportDetailRequest({ reportId }));
    }
  }, [reportId]);

  const onTeststepCardClick = (selectedTeststep) => {
    dispatch(getTeststepReportRequest({ teststep: selectedTeststep }));
  };

  const onOpenOutcomeModal = (fieldData) => {
    const {
      name: field,
      status,
      value: expectedValue,
      res_value: responseValue,
      testsuiteName,
      testcaseName,
      teststepName,
      testdataName,
    } = fieldData;

    setSelectedCommentField((prevState) => ({
      ...prevState,
      reportId,
      testsuite: testsuiteName,
      testcase: testcaseName,
      teststep: teststepName,
      testdata: testdataName,
      field,
      status,
      updatedStatus: status,
      expectedValue,
      responseValue,
      project: projectName,
    }));
    setIsCommentModalOpen(true);
  };

  const onCloseCommentModal = () => {
    setIsCommentModalOpen(false);
  };

  return (
    <>
      {isCommentModalOpen && (
        <TestFieldCommentModal
          show={isCommentModalOpen}
          data={selectedCommentField}
          onCloseModal={onCloseCommentModal}
        />
      )}
      {showTeststepReport ? (
        <TeststepReportDetails
          data={teststepReport}
          onOpenOutcomeModal={onOpenOutcomeModal}
        />
      ) : (
        <ReportDetails
          name={name}
          passedFields={passedFields}
          failedFields={failedFields}
          data={reportData}
          level={level}
          onTeststepCardClick={onTeststepCardClick}
        />
      )}
    </>
  );
};

export default ReportDetailsContainer;
