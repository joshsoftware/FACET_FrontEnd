import teststepConstants from "./constants";

const initialState = { isLoading: true, teststeps: [] };

const teststepReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case teststepConstants.GET_TESTSTEPS_REQUEST:
      return { ...state, isLoading: true };

    case teststepConstants.GET_TESTSTEPS_SUCCESS:
      return { ...state, isLoading: false, teststeps: payload };

    case teststepConstants.GET_TESTSTEPS_FAILURE:
      return { ...state, isLoading: false };

    case teststepConstants.ADD_TESTSTEPS_REQUEST:
      return { ...state, isLoading: true };

    case teststepConstants.ADD_TESTSTEPS_SUCCESS:
      return { ...state, isLoading: false };

    case teststepConstants.ADD_TESTSTEPS_FAILURE:
      return { ...state, isLoading: false };

    case teststepConstants.EDIT_TESTSTEPS_REQUEST:
      return { ...state, isLoading: true };

    case teststepConstants.EDIT_TESTSTEPS_SUCCESS:
      return { ...state, isLoading: false };

    case teststepConstants.EDIT_TESTSTEPS_FAILURE:
      return { ...state, isLoading: false };

    default:
      return state;
  }
};

export default teststepReducer;
