import testcaseConstants from "./constants";

const initialState = { isLoading: false, testcases: [], errors: [] };

const testcaseReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case testcaseConstants.GET_TESTCASES_REQUEST:
      return { ...state, isLoading: true };

    case testcaseConstants.GET_TESTCASES_SUCCESS:
      return { ...state, isLoading: false, testcases: payload, errors: [] };

    case testcaseConstants.GET_TESTCASES_FAILURE:
      return { ...state, isLoading: false, errors: payload };

    case testcaseConstants.ADD_TESTCASES_REQUEST:
      return { ...state, isLoading: true };

    case testcaseConstants.ADD_TESTCASES_SUCCESS:
      return { ...state, isLoading: false };

    case testcaseConstants.ADD_TESTCASES_FAILURE:
      return { ...state, isLoading: false, errors: payload };

    case testcaseConstants.EDIT_TESTCASES_REQUEST:
      return { ...state, isLoading: true };

    case testcaseConstants.EDIT_TESTCASES_SUCCESS:
      return { ...state, isLoading: false };

    case testcaseConstants.EDIT_TESTCASES_FAILURE:
      return { ...state, isLoading: false, errors: payload };

    default:
      return state;
  }
};

export default testcaseReducer;
