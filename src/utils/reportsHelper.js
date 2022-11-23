// It helps to get dynamic data or keys based on its level
export const getReportDetails = (level, result) => {
  const {
    testcase,
    testsuite,
    status,
    teststeps: caseReportData,
    testsuite_execution: suiteReportData,
    no_of_passed_teststeps: passedSteps,
    no_of_failed_teststeps: failedSteps,
    no_of_passed_testcases: passedCases,
    no_of_failed_testcases: failedCases,
  } = result;

  switch (level) {
    case "testcase":
      return {
        name: testcase?.name || "",
        reportData: caseReportData || [],
        status,
        passedFields: passedSteps || 0,
        failedFields: failedSteps || 0,
      };

    case "testsuite":
      return {
        name: testsuite?.name || "",
        reportData: suiteReportData || [],
        status,
        passedFields: passedCases || 0,
        failedFields: failedCases || 0,
      };

    default:
      return { name: "", passedFields: 0, failedFields: 0, reportData: [], status: "" };
  }
};
