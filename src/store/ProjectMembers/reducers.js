import projectMembersConstants from "./constants";

const initialState = {
  project: "",
  members: [],
  projectAdmin: null,
  isLoading: false,
};

const projectMembersReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case projectMembersConstants.GET_PROJECT_MEMBERS_REQUEST:
      return { ...state, isLoading: true };

    case projectMembersConstants.GET_PROJECT_MEMBERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        project: payload.project,
        members: payload.members,
        projectAdmin: payload.project_admin,
      };

    case projectMembersConstants.GET_PROJECT_MEMBERS_FAILURE:
      return { ...state, isLoading: false };

    case projectMembersConstants.ADD_MEMBERS_IN_PROJECT_REQUEST:
      return { ...state, isLoading: true };

    case projectMembersConstants.ADD_MEMBERS_IN_PROJECT_SUCCESS:
      return { ...state, isLoading: false };

    case projectMembersConstants.ADD_MEMBERS_IN_PROJECT_FAILURE:
      return { ...state, isLoading: false };

    case projectMembersConstants.REMOVE_MEMBERS_IN_PROJECT_REQUEST:
      return { ...state, isLoading: true };

    case projectMembersConstants.REMOVE_MEMBERS_IN_PROJECT_SUCCESS:
      return { ...state, isLoading: false };

    case projectMembersConstants.REMOVE_MEMBERS_IN_PROJECT_FAILURE:
      return { ...state, isLoading: false };

    default:
      return state;
  }
};

export default projectMembersReducer;
