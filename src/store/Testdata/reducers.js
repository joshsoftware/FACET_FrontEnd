import testdataConstants from "./constants";

const initialState = { isLoading: false, testdata: [] };

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
      return { ...state, isLoading: false };

    case testdataConstants.ADD_TESTDATA_FAILURE:
      return { ...state, isLoading: false };

    default:
      return state;
  }
};

export default testdataReducer;
