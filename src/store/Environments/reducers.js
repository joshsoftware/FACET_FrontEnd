import environmentConstants from "./constants";

const initialState = { isLoading: false, environments: [] };

const environmentReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case environmentConstants.GET_ENVIRONMENTS_REQUEST:
      return { ...state, isLoading: true };

    case environmentConstants.GET_ENVIRONMENTS_SUCCESS:
      return { ...state, isLoading: false, environments: payload };

    case environmentConstants.GET_ENVIRONMENTS_FAILURE:
      return { ...state, isLoading: false };

    case environmentConstants.ADD_ENVIRONMENTS_REQUEST:
      return { ...state, isLoading: true };

    case environmentConstants.ADD_ENVIRONMENTS_SUCCESS:
      return { ...state, isLoading: false };

    case environmentConstants.ADD_ENVIRONMENTS_FAILURE:
      return { ...state, isLoading: false };

    case environmentConstants.EDIT_ENVIRONMENTS_REQUEST:
      return { ...state, isLoading: true };

    case environmentConstants.EDIT_ENVIRONMENTS_SUCCESS:
      return { ...state, isLoading: false };

    case environmentConstants.EDIT_ENVIRONMENTS_FAILURE:
      return { ...state, isLoading: false };

    default:
      return state;
  }
};

export default environmentReducer;
