import headerConstants from "./constants";

const initialState = { isLoading: false, headers: [], errors: "" };

const headerReducer = (state = initialState, action) => {
  switch (action.type) {
    case headerConstants.GET_HEADERS_REQUEST:
      return { ...state, isLoading: true };

    case headerConstants.GET_HEADERS_SUCCESS:
      return { ...state, isLoading: false, headers: action.payload };

    case headerConstants.GET_HEADERS_FAILURE:
      return { ...state, isLoading: false, errors: action.payload };

    default:
      return state;
  }
};

export default headerReducer;
