import projectConstants from "./constants";

const initialState = {
  projects: [],
  isLoading: false,
  isSuccess: false,
  project: {},
};

const projectReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case projectConstants.GET_PROJECTS_REQUEST:
      return { ...state, isLoading: true };

    case projectConstants.GET_PROJECTS_SUCCESS:
      return { ...state, projects: payload, isLoading: false };

    case projectConstants.GET_PROJECTS_FAILURE:
      return { ...state, isLoading: false };

    case projectConstants.ADD_PROJECT_REQUEST:
      return { ...state, isLoading: true };

    case projectConstants.ADD_PROJECT_SUCCESS:
      return { ...state, isLoading: false };

    case projectConstants.ADD_PROJECT_FAILURE:
      return { ...state, isLoading: false };

    case projectConstants.GET_PROJECT_REQUEST:
      return { ...state, isLoading: true, project: {} };

    case projectConstants.GET_PROJECT_SUCCESS:
      return { ...state, isLoading: false, project: payload };

    case projectConstants.GET_PROJECT_FAILURE:
      return { ...state, isLoading: false };

    case projectConstants.UPDATE_PROJECT_NAME_REQUEST:
      return { ...state, isLoading: true, isSuccess: false };

    case projectConstants.UPDATE_PROJECT_NAME_SUCCESS:
      return { ...state, isLoading: false, isSuccess: true };

    case projectConstants.UPDATE_PROJECT_NAME_FAILURE:
      return { ...state, isLoading: false, isSuccess: false };

    case projectConstants.DELETE_PROJECT_REQUEST:
      return { ...state, isLoading: true, isSuccess: false };

    case projectConstants.DELETE_PROJECT_SUCCESS:
      return { ...state, isLoading: false, isSuccess: true };

    case projectConstants.DELETE_PROJECT_FAILURE:
      return { ...state, isLoading: false, isSuccess: false };

    default:
      return state;
  }
};

export default projectReducer;
