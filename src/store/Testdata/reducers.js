import testdataConstants from "./constants";

const initialState = {
  isLoading: false,
  testdata: [],
  isFileTransferInProcess: false,
  errors: [],
};

const testdataReducer = (state = initialState, action) => {
  switch (action.type) {
    case testdataConstants.GET_TESTDATA_REQUEST:
      return { ...state, isLoading: true };

    case testdataConstants.GET_TESTDATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        testdata: action.payload,
        errors: [],
      };

    case testdataConstants.GET_TESTDATA_FAILURE:
      return { ...state, isLoading: false, errors: action.payload };

    case testdataConstants.DOWNLOAD_EXCEL_REQUEST:
      return { ...state, isFileTransferInProcess: true };

    case testdataConstants.DOWNLOAD_EXCEL_SUCCESS:
      return { ...state, isFileTransferInProcess: false };

    case testdataConstants.DOWNLOAD_EXCEL_FAILURE:
      return {
        ...state,
        isFileTransferInProcess: false,
        errors: action.payload,
      };

    case testdataConstants.UPLOAD_EXCEL_REQUEST:
      return { ...state, isFileTransferInProcess: true };

    case testdataConstants.UPLOAD_EXCEL_SUCCESS:
      return { ...state, isFileTransferInProcess: false };

    case testdataConstants.UPLOAD_EXCEL_FAILURE:
      return {
        ...state,
        isFileTransferInProcess: false,
        errors: action.payload,
      };

    default:
      return state;
  }
};

export default testdataReducer;
