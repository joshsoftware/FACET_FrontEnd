import reportsConstants from "./constants";

const INITIAL_STATE = {
    isReportsLoading: true,
    reports: [],
    errors: [],
    isOneReportLoading: true,
    singleReport: {},
    isOneTeststepReportLoading: true,
    singleTeststepReport: {},
    isAddCommentLoading: false
}

const reportsReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case reportsConstants.GET_REPORTS_REQUEST:
            return {
                ...state,
                isReportsLoading: true
            }

        case reportsConstants.GET_REPORTS_SUCCESS:
            return {
                ...state,
                isReportsLoading: false,
                reports: action.payload,
                errors: []
            }

        case reportsConstants.GET_REPORTS_FAILURE:
            return {
                ...state,
                isReportsLoading: false,
                errors: action.payload
            }

        case reportsConstants.GET_SINGLE_REPORT_REQUEST:
            return {
                ...state,
                isOneReportLoading: true
            }

        case reportsConstants.GET_SINGLE_REPORT_SUCCESS:
            return {
                ...state,
                isOneReportLoading: false,
                singleReport: action.payload
            }

        case reportsConstants.GET_SINGLE_REPORT_FAILURE:
            return {
                ...state,
                isOneReportLoading: false,
                errors: action.payload
            }

        case reportsConstants.GET_TESTSTEP_OF_SINGLE_REPORT_REQUEST:
            return {
                ...state,
                isOneTeststepReportLoading: true
            }

        case reportsConstants.GET_TESTSTEP_OF_SINGLE_REPORT_SUCCESS:
            return {
                ...state,
                isOneTeststepReportLoading: false,
                singleTeststepReport: action.payload
            }

        case reportsConstants.GET_TESTSTEP_OF_SINGLE_REPORT_FAILURE:
            return {
                ...state,
                isOneTeststepReportLoading: false,
                errors: action.payload
            }

        case reportsConstants.ADD_COMMENT_REQUEST:
            return {
                ...state,
                isAddCommentLoading: true
            }

        case reportsConstants.ADD_COMMENT_SUCCESS:
            return {
                ...state,
                isAddCommentLoading: false
            }

        case reportsConstants.ADD_COMMENT_FAILURE:
            return {
                ...state,
                isAddCommentLoading: false,
                errors: action.payload
            }

        default:
            return state;
    }
}

export default reportsReducer;
