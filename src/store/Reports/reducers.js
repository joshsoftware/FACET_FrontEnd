import reportsConstants from "./constants";

const initialState = {
  isReportsLoading: true,
  reports: [],
  totalResults: 0,
  page: 0,
  isOneReportLoading: true,
  singleReport: {
    level: "",
    result: {},
  },
  showTeststepReport: false,
  isOneTeststepReportLoading: true,
  singleTeststepReport: {},
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

    case reportsConstants.GET_SINGLE_REPORT_REQUEST:
      return { ...state, isOneReportLoading: true, showTeststepReport: false };

    case reportsConstants.GET_SINGLE_REPORT_SUCCESS:
      return { ...state, isOneReportLoading: false, singleReport: payload };

    case reportsConstants.GET_SINGLE_REPORT_FAILURE:
      return { ...state, isOneReportLoading: false };

    case reportsConstants.GET_TESTSTEP_OF_SINGLE_REPORT_REQUEST:
      return {
        ...state,
        isOneTeststepReportLoading: true,
        showTeststepReport: false,
      };

    case reportsConstants.GET_TESTSTEP_OF_SINGLE_REPORT_SUCCESS:
      return {
        ...state,
        isOneTeststepReportLoading: false,
        singleTeststepReport: payload,
        showTeststepReport: true,
      };

    case reportsConstants.GET_TESTSTEP_OF_SINGLE_REPORT_FAILURE:
      return {
        ...state,
        isOneTeststepReportLoading: false,
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
