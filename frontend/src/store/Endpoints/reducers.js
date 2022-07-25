import endpointConstants from "./constants";

const INITIAL_STATE = {
    isLoading: true,
    endpoints: [],
    errors: []
}

const endpointReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case endpointConstants.GET_ENDPOINT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                endpoints: action.payload
            }

        case endpointConstants.GET_ENDPOINT_FAILURE:
            return {
                ...state,
                errors: action.payload
            }

        default:
            return state;
    }
}

export default endpointReducer;