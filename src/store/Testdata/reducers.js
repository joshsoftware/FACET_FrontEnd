import testdataConstants from "./constants";

const initialState = { isLoading: false, testdata: [], isSuccess: false };

const testdataReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case testdataConstants.GET_TESTDATA_REQUEST:
      return { ...state, isLoading: true };

    case testdataConstants.GET_TESTDATA_SUCCESS:
      return { ...state, isLoading: false, testdata: payload };

    case testdataConstants.GET_TESTDATA_FAILURE:
      return { ...state, isLoading: false };

    case testdataConstants.ADD_TESTDATA_REQUEST:
      return { ...state, isLoading: true };

    case testdataConstants.ADD_TESTDATA_SUCCESS:
      return { ...state, isLoading: false, isSuccess: true };

    case testdataConstants.ADD_TESTDATA_FAILURE:
      return { ...state, isLoading: false };

    case testdataConstants.EDIT_TESTDATA_REQUEST:
      return { ...state, isLoading: true };

    case testdataConstants.EDIT_TESTDATA_SUCCESS:
      return { ...state, isLoading: false, isSuccess: true };

    case testdataConstants.EDIT_TESTDATA_FAILURE:
      return { ...state, isLoading: false };

    case testdataConstants.CLEAR_TESTDATA_STATE:
      return { ...state, isSuccess: false };

    default:
      return state;
  }
};

export default testdataReducer;
