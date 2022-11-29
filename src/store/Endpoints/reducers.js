import endpointConstants from "./constants";

const initialState = {
  isLoading: true,
  endpoints: [],
  errors: [],
};

const endpointReducer = (state = initialState, action) => {
  switch (action.type) {
    case endpointConstants.GET_ENDPOINT_REQUEST:
      return { ...state, isLoading: true };

    case endpointConstants.GET_ENDPOINT_SUCCESS:
      return { ...state, isLoading: false, endpoints: action.payload };

    case endpointConstants.GET_ENDPOINT_FAILURE:
      return { ...state, isLoading: false, errors: action.payload };

    case endpointConstants.ADD_ENDPOINT_REQUEST:
      return { ...state, isLoading: true };

    case endpointConstants.ADD_ENDPOINT_SUCCESS:
      return { ...state, isLoading: false };

    case endpointConstants.ADD_ENDPOINT_FAILURE:
      return { ...state, isLoading: false, errors: action.payload };

    case endpointConstants.EDIT_ENDPOINT_REQUEST:
      return { ...state, isLoading: true };

    case endpointConstants.EDIT_ENDPOINT_SUCCESS:
      return { ...state, isLoading: false };

    case endpointConstants.EDIT_ENDPOINT_FAILURE:
      return { ...state, isLoading: false, errors: action.payload };

    default:
      return state;
  }
};

export default endpointReducer;
