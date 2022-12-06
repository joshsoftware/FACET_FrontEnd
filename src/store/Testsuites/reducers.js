import testsuiteConstants from "./constants";

const initialState = { isLoading: false, testsuites: [] };

const testsuiteReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case testsuiteConstants.GET_TESTSUITES_REQUEST:
      return { ...state, isLoading: true };

    case testsuiteConstants.GET_TESTSUITES_SUCCESS:
      return { ...state, isLoading: false, testsuites: payload };

    case testsuiteConstants.GET_TESTSUITES_FAILURE:
      return { ...state, isLoading: false };

    case testsuiteConstants.ADD_TESTSUITE_REQUEST:
      return { ...state, isLoading: true };

    case testsuiteConstants.ADD_TESTSUITE_SUCCESS:
      return { ...state, isLoading: false };

    case testsuiteConstants.ADD_TESTSUITE_FAILURE:
      return { ...state, isLoading: false };

    case testsuiteConstants.EDIT_TESTSUITE_REQUEST:
      return { ...state, isLoading: true };

    case testsuiteConstants.EDIT_TESTSUITE_SUCCESS:
      return { ...state, isLoading: false };

    case testsuiteConstants.EDIT_TESTSUITE_FAILURE:
      return { ...state, isLoading: false };

    case testsuiteConstants.DELETE_TESTSUITE_REQUEST:
      return { ...state, isLoading: true };

    case testsuiteConstants.DELETE_TESTSUITE_SUCCESS:
      return { ...state, isLoading: false };

    case testsuiteConstants.DELETE_TESTSUITE_FAILURE:
      return { ...state, isLoading: false };

    default:
      return state;
  }
};

export default testsuiteReducer;
