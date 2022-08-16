import payloadConstants from "./constants";

const INITIAL_STATE = {
    isReportsLoading: true,
    reports: [],
    errors: [],
    isOneReportLoading: true,
    singleReport: {}
}

const reportsReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case payloadConstants.GET_REPORTS_REQUEST:
            return {
                ...state,
                isReportsLoading: true
            }

        case payloadConstants.GET_REPORTS_SUCCESS:
            return {
                ...state,
                isReportsLoading: false,
                reports: action.payload,
                errors: []
            }
    
        case payloadConstants.GET_REPORTS_FAILURE:
            return {
                ...state,
                isReportsLoading: false,
                errors: action.payload
            }

        case payloadConstants.GET_SINGLE_REPORT_REQUEST:
            return {
                ...state,
                isOneReportLoading: true
            }

        case payloadConstants.GET_SINGLE_REPORT_SUCCESS:
            return {
                ...state,
                isOneReportLoading: false,
                singleReport: action.payload
            }
        
        case payloadConstants.GET_SINGLE_REPORT_FAILURE:
            return {
                ...state,
                isOneReportLoading: false,
                errors: action.payload
            }
            
        default:
            return state;
    }
}

export default reportsReducer;