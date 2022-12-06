import reportsConstants from "./constants";

const initialState = {
  isReportsLoading: true,
  reports: [],
  totalResults: 0,
  page: 0,
  isReportLoading: true,
  report: {
    level: "",
    result: {},
  },
  showTeststepReport: false,
  isTeststepReportLoading: true,
  teststepReport: {},
  isAddCommentLoading: false,
};

const reportsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case reportsConstants.GET_REPORTS_REQUEST:
      return {
        ...state,
        isReportsLoading: true,
        page: payload.page,
        reports: state.reports,
      };

    case reportsConstants.GET_REPORTS_SUCCESS:
      return {
        ...state,
        isReportsLoading: false,
        reports:
          state.page === 1
            ? payload.results
            : state.reports.concat(payload.results),
        totalResults: payload.total_results,
      };

    case reportsConstants.GET_REPORTS_FAILURE:
      return { ...state, isReportsLoading: false };

    case reportsConstants.GET_REPORT_REQUEST:
      return { ...state, isReportLoading: true, showTeststepReport: false };

    case reportsConstants.GET_REPORT_SUCCESS:
      return { ...state, isReportLoading: false, report: payload };

    case reportsConstants.GET_REPORT_FAILURE:
      return { ...state, isReportLoading: false };

    case reportsConstants.GET_TESTSTEP_OF_REPORT_REQUEST:
      return {
        ...state,
        isTeststepReportLoading: true,
        showTeststepReport: false,
      };

    case reportsConstants.GET_TESTSTEP_OF_REPORT_SUCCESS:
      return {
        ...state,
        isTeststepReportLoading: false,
        teststepReport: payload,
        showTeststepReport: true,
      };

    case reportsConstants.GET_TESTSTEP_OF_REPORT_FAILURE:
      return {
        ...state,
        isTeststepReportLoading: false,
        showTeststepReport: false,
      };

    case reportsConstants.ADD_COMMENT_REQUEST:
      return { ...state, isAddCommentLoading: true };

    case reportsConstants.ADD_COMMENT_SUCCESS:
      return { ...state, isAddCommentLoading: false };

    case reportsConstants.ADD_COMMENT_FAILURE:
      return { ...state, isAddCommentLoading: false };

    default:
      return state;
  }
};

export default reportsReducer;
