import orgConstants from "./constants";

const initialState = {
  isLoading: false,
  organization: {},
  isSuccess: false,
};

const organizationsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case orgConstants.GET_ORGANIZATION_REQUEST:
      return { ...state, isLoading: true };

    case orgConstants.GET_ORGANIZATION_SUCCESS:
      return { ...state, isLoading: false, organization: payload };

    case orgConstants.GET_ORGANIZATION_FAILURE:
      return { ...state, isLoading: false };

    case orgConstants.ADD_ORGANIZATION_REQUEST:
      return { ...state, isLoading: true };

    case orgConstants.ADD_ORGANIZATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        organization: payload,
      };

    case orgConstants.ADD_ORGANIZATION_FAILURE:
      return { ...state, isLoading: false };

    case orgConstants.EDIT_ORGANIZATION_REQUEST:
      return { ...state, isLoading: true };

    case orgConstants.EDIT_ORGANIZATION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        organization: payload,
        isSuccess: true,
      };

    case orgConstants.EDIT_ORGANIZATION_FAILURE:
      return { ...state, isLoading: false };

    case orgConstants.INVITE_USERS_IN_ORGANIZATION_REQUEST:
      return { ...state, isLoading: true };

    case orgConstants.INVITE_USERS_IN_ORGANIZATION_SUCCESS:
      return { ...state, isLoading: false, isSuccess: true };

    case orgConstants.INVITE_USERS_IN_ORGANIZATION_FAILURE:
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

    case orgConstants.ACCEPT_JOIN_ORG_INVITATION_REQUEST:
      return { ...state, isLoading: true };

    case orgConstants.ACCEPT_JOIN_ORG_INVITATION_SUCCESS:
      return { ...state, isLoading: false, isSuccess: true };

    case orgConstants.ACCEPT_JOIN_ORG_INVITATION_FAILURE:
      return { ...state, isLoading: false };

    case orgConstants.RESET_ORGANIZATION_STATE:
      return { ...state, isSuccess: false };

    default:
      return state;
  }
};

export default organizationsReducer;
