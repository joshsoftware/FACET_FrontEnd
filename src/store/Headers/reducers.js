import headerConstants from "./constants";

const initialState = { isLoading: false, headers: [] };

const headerReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case headerConstants.GET_HEADERS_REQUEST:
      return { ...state, isLoading: true };

    case headerConstants.GET_HEADERS_SUCCESS:
      return { ...state, isLoading: false, headers: payload };

    case headerConstants.GET_HEADERS_FAILURE:
      return { ...state, isLoading: false };

    case headerConstants.ADD_HEADERS_REQUEST:
      return { ...state, isLoading: true };

    case headerConstants.ADD_HEADERS_SUCCESS:
      return { ...state, isLoading: false };

    case headerConstants.ADD_HEADERS_FAILURE:
      return { ...state, isLoading: false };

    case headerConstants.EDIT_HEADERS_REQUEST:
      return { ...state, isLoading: true };

    case headerConstants.EDIT_HEADERS_SUCCESS:
      return { ...state, isLoading: false };

    case headerConstants.EDIT_HEADERS_FAILURE:
      return { ...state, isLoading: false };

    default:
      return state;
  }
};

export default headerReducer;
