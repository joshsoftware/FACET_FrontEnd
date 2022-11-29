import environmentConstants from "./constants";

const initialState = {
  isLoading: false,
  environments: [],
  errors: [],
};

const environmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case environmentConstants.GET_ENVIRONMENTS_REQUEST:
      return { ...state, isLoading: true };

    case environmentConstants.GET_ENVIRONMENTS_SUCCESS:
      return { ...state, isLoading: false, environments: action.payload };

    case environmentConstants.GET_ENVIRONMENTS_FAILURE:
      return { ...state, isLoading: false, errors: action.payload };

    case environmentConstants.ADD_ENVIRONMENTS_REQUEST:
      return { ...state, isLoading: true };

    case environmentConstants.ADD_ENVIRONMENTS_SUCCESS:
      return { ...state, isLoading: false };

    case environmentConstants.ADD_ENVIRONMENTS_FAILURE:
      return { ...state, isLoading: false, errors: action.payload };

    case environmentConstants.EDIT_ENVIRONMENTS_REQUEST:
      return { ...state, isLoading: true };

    case environmentConstants.EDIT_ENVIRONMENTS_SUCCESS:
      return { ...state, isLoading: false };

    case environmentConstants.EDIT_ENVIRONMENTS_FAILURE:
      return { ...state, isLoading: false, errors: action.payload };

    default:
      return state;
  }
};

export default environmentReducer;
