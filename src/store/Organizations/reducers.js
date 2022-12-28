import orgConstants from "./constants";

const initialState = { isLoading: false, organizations: [], isSuccess: false };

const organizationReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case orgConstants.GET_ORGANIZATIONS_REQUEST:
      return { ...state, isLoading: true };

    case orgConstants.GET_ORGANIZATIONS_SUCCESS:
      return { ...state, isLoading: false, organizations: payload };

    case orgConstants.GET_ORGANIZATIONS_FAILURE:
      return { ...state, isLoading: false };

    case orgConstants.ADD_ORGANIZATION_REQUEST:
      return { ...state, isLoading: true };

    case orgConstants.ADD_ORGANIZATION_SUCCESS:
      return { ...state, isLoading: false, isSuccess: true };

    case orgConstants.ADD_ORGANIZATION_FAILURE:
      return { ...state, isLoading: false };

    case orgConstants.EDIT_ORGANIZATION_REQUEST:
      return { ...state, isLoading: true };

    case orgConstants.EDIT_ORGANIZATION_SUCCESS:
      return { ...state, isLoading: false, isSuccess: true };

    case orgConstants.EDIT_ORGANIZATION_FAILURE:
      return { ...state, isLoading: false };

    case orgConstants.LEAVE_ORGANIZATION_REQUEST:
      return { ...state, isLoading: true };

    case orgConstants.LEAVE_ORGANIZATION_SUCCESS:
      return { ...state, isLoading: false, isSuccess: true };

    case orgConstants.LEAVE_ORGANIZATION_FAILURE:
      return { ...state, isLoading: false };

    case orgConstants.DELETE_ORGANIZATION_REQUEST:
      return { ...state, isLoading: true };

    case orgConstants.DELETE_ORGANIZATION_SUCCESS:
      return { ...state, isLoading: false, isSuccess: true };

    case orgConstants.DELETE_ORGANIZATION_FAILURE:
      return { ...state, isLoading: false };

    default:
      return state;
  }
};

export default organizationReducer;
