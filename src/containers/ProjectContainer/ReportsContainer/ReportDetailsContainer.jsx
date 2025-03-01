import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  addCommentRequest,
  getReportDetailRequest,
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
  executedStatus: "",
  expectedValue: "",
  responseValue: "",
  project: "",
  comment: "",
};

const mapState = ({ reports }) => ({
  level: reports.report.level,
  reportDetail: reports.report.result || {},
  isReportLoading: reports.isReportLoading,
  showTeststepReport: reports.showTeststepReport,
  teststepReport: reports.teststepReport,
  environment: reports.report?.environment?.url,
});

const ReportDetailsContainer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projectName, reportId } = useParams();
  const { reportDetail, level, environment, isReportLoading } =
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
  const [teststepReport, setTeststepReport] = useState(null);

  useEffect(() => {
    if (reportId) {
      dispatch(getReportDetailRequest({ reportId }));
    }
  }, [reportId]);

  const onTeststepCardClick = (selectedTeststep) => {
    setTeststepReport(selectedTeststep);
  };

  const onOpenOutcomeModal = (fieldData) => {
    const {
      name: field,
      status,
      comment,
      executed_status: executedStatus,
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
      prevStatus: status,
      status,
      comment,
      executedStatus,
      expectedValue,
      responseValue,
      project: projectName,
    }));
    setIsCommentModalOpen(true);
  };

  const onCloseCommentModal = () => {
    setIsCommentModalOpen(false);
  };

  const onChangeCommentForm = (name, value) => {
    setSelectedCommentField((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onCommentFormSubmit = (e) => {
    e.preventDefault();
    const {
      field,
      status,
      comment,
      reportId,
      project,
      testsuite,
      testcase,
      teststep,
      testdata,
    } = selectedCommentField;
    dispatch(
      addCommentRequest({
        field,
        status,
        comment,
        reportId,
        project,
        testsuite,
        testcase,
        teststep,
        testdata,
      })
    );
  };

  const onBackFromTeststepReport = () => setTeststepReport(null);

  // navigate to reports page when reportDeatil not available
  if (!isReportLoading && Object.entries(reportDetail).length === 0) {
    navigate(`/project/${projectName}/reports`);
  }

  return (
    <>
      {isCommentModalOpen && (
        <TestFieldCommentModal
          show={isCommentModalOpen}
          data={selectedCommentField}
          onCloseModal={onCloseCommentModal}
          onChangeCommentForm={onChangeCommentForm}
          onCommentFormSubmit={onCommentFormSubmit}
        />
      )}
      {teststepReport ? (
        <TeststepReportDetails
          data={teststepReport}
          environment={environment}
          onBack={onBackFromTeststepReport}
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
