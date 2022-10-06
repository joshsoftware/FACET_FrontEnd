import payloadConstants from "./constants";

const INITIAL_STATE = {
    isLoading: true,
    payloads: [],
    errors: []
}

const payloadReducer = (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case payloadConstants.GET_PAYLOADS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                payloads: action.payload,
                errors: []
            }
    
        case payloadConstants.GET_PAYLOADS_FAILURE:
            return {
                ...state,
                isLoading: false,
                errors: action.payload
            }
            
        default:
            return state;
    }
}

export default payloadReducer;