import testdataConstants from "./constants";

const INITIAL_STATE = {
    isLoading: true,
    testdata: [],
    errors: []
}

const testdataReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case testdataConstants.GET_TESTDATA_SUCCESS:
            return {
                ...state,
                isLoading: false,
                testdata: action.payload,
                errors: []
            }
    
        case testdataConstants.GET_TESTDATA_FAILURE:
            return {
                ...state,
                isLoading: false,
                errors: action.payload
            }
            
        default:
            return state;
    }
}

export default testdataReducer;