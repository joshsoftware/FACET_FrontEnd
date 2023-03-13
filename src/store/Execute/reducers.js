import executeConstants from "./constants";

const initialState = {
  isLoading: false,
  isError: false,
  data: {},
  results: [],
};

const executeReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case executeConstants.ADD_EXECUTE_REQUEST:
      return { ...state, isLoading: true, data: payload.data };

    case executeConstants.ADD_EXECUTE_SUCCESS:
      return { ...state, isLoading: false, results: payload };

    case executeConstants.ADD_EXECUTE_FAILURE:
      return {
        ...state,
        isLoading: false,
        data: {},
        results: [],
        isError: true,
      };

    case executeConstants.CLEAR_EXECUTE_FAILURE:
      return { ...state, isLoading: false, isError: false };

    default:
      return state;
  }
};

export default executeReducer;
