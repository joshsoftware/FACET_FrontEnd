import executeConstants from "./constants";

const initialState = {
  isLoading: false,
  isError: false,
  data: {},
  results: [],
  errors: [],
};

const executeReducer = (state = initialState, action) => {
  switch (action.type) {
    case executeConstants.ADD_EXECUTE_REQUEST:
      return {
        ...state,
        isLoading: true,
        data: action.payload.data,
        errors: [],
      };

    case executeConstants.ADD_EXECUTE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        results: action.payload,
        errors: [],
      };

    case executeConstants.ADD_EXECUTE_FAILURE:
      return {
        ...state,
        isLoading: false,
        data: {},
        results: [],
        isError: true,
        errors: action.payload,
      };

    case executeConstants.CLEAR_EXECUTE_FAILURE:
      return { ...state, isLoading: false, isError: false };

    default:
      return state;
  }
};

export default executeReducer;
