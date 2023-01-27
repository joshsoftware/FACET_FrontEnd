import orgMembersConstants from "./constants";

const initialState = {
  isLoading: false,
  members: [],
  filteredUsers: [],
  isSuccess: false,
};

const orgMembersReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case orgMembersConstants.GET_ORG_MEMBERS_REQUEST:
      return { ...state, isLoading: true };

    case orgMembersConstants.GET_ORG_MEMBERS_SUCCESS:
      return { ...state, isLoading: false, members: payload };

    case orgMembersConstants.GET_ORG_MEMBERS_FAILURE:
      return { ...state, isLoading: false };

    case orgMembersConstants.CHANGE_MEMBER_ROLE_REQUEST:
      return { ...state, isLoading: true };

    case orgMembersConstants.CHANGE_MEMBER_ROLE_SUCCESS:
      return { ...state, isLoading: false, isSuccess: true };

    case orgMembersConstants.CHANGE_MEMBER_ROLE_FAILURE:
      return { ...state, isLoading: false };

    case orgMembersConstants.REMOVE_MEMBER_FROM_ORG_REQUEST:
      return { ...state, isLoading: true };

    case orgMembersConstants.REMOVE_MEMBER_FROM_ORG_SUCCESS:
      return { ...state, isLoading: false, isSuccess: true };

    case orgMembersConstants.REMOVE_MEMBER_FROM_ORG_FAILURE:
      return { ...state, isLoading: false };

    case orgMembersConstants.GET_FILTERED_ORG_USERS_REQUEST:
      return { ...state, isLoading: true };

    case orgMembersConstants.GET_FILTERED_ORG_USERS_SUCCESS:
      return { ...state, isLoading: false, filteredUsers: payload };

    case orgMembersConstants.GET_FILTERED_ORG_USERS_FAILURE:
      return { ...state, isLoading: false };

    case orgMembersConstants.RESET_ORG_MEMBER_STATE:
      return { ...state, isSuccess: false };

    default:
      return state;
  }
};

export default orgMembersReducer;
