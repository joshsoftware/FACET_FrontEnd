// It helps to get dynamic data or keys based on its level
export const getReportDetails = (level, result) => {
  const {
    testcase,
    testsuite,
    no_of_failed_testcases,
    no_of_failed_teststeps,
    no_of_passed_testcases,
    no_of_passed_teststeps,
  } = result;

  switch (level) {
    case "testcase":
      return {
        name: testcase?.name || "",
        passedFields: no_of_passed_teststeps || 0,
        failedFields: no_of_failed_teststeps || 0,
      };

    case "testsuite":
      return {
        name: testsuite?.name || "",
        passedFields: no_of_passed_testcases || 0,
        failedFields: no_of_failed_testcases || 0,
      };

    default:
      return { name: "", passedFields: 0, failedFields: 0 };
  }
};
