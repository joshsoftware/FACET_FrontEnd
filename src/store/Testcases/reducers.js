import testcaseConstants from "./constants";

const initialState = { isLoading: false, testcases: [] };

const testcaseReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case testcaseConstants.GET_TESTCASES_REQUEST:
      return { ...state, isLoading: true };

    case testcaseConstants.GET_TESTCASES_SUCCESS:
      return { ...state, isLoading: false, testcases: payload };

    case testcaseConstants.GET_TESTCASES_FAILURE:
      return { ...state, isLoading: false };

    case testcaseConstants.ADD_TESTCASES_REQUEST:
      return { ...state, isLoading: true };

    case testcaseConstants.ADD_TESTCASES_SUCCESS:
      return { ...state, isLoading: false };

    case testcaseConstants.ADD_TESTCASES_FAILURE:
      return { ...state, isLoading: false };

    case testcaseConstants.EDIT_TESTCASES_REQUEST:
      return { ...state, isLoading: true };

    case testcaseConstants.EDIT_TESTCASES_SUCCESS:
      return { ...state, isLoading: false };

    case testcaseConstants.EDIT_TESTCASES_FAILURE:
      return { ...state, isLoading: false };

    default:
      return state;
  }
};

export default testcaseReducer;
