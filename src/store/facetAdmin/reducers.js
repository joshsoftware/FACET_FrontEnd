import facetAdminConstants from "./constants";

const initialState = {
  isLoading: false,
  organizations: [],
  organization: {},
  users: [],
};

const adminReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case facetAdminConstants.GET_ORGANIZATIONS_REQUEST:
      return { ...state, isLoading: true };

    case facetAdminConstants.GET_ORGANIZATIONS_SUCCESS:
      return { ...state, isLoading: false, organizations: payload };

    case facetAdminConstants.GET_ORGANIZATIONS_FAILURE:
      return { ...state, isLoading: false };

    case facetAdminConstants.GET_ORGANIZATION_REQUEST:
      return { ...state, isLoading: true };

    case facetAdminConstants.GET_ORGANIZATION_SUCCESS:
      return { ...state, isLoading: false, organization: payload };

    case facetAdminConstants.GET_ORGANIZATION_FAILURE:
      return { ...state, isLoading: false };

    case facetAdminConstants.GET_USERS_REQUEST:
      return { ...state, isLoading: true };

    case facetAdminConstants.GET_USERS_SUCCESS:
      return { ...state, isLoading: false, users: payload };

    case facetAdminConstants.GET_USERS_FAILURE:
      return { ...state, isLoading: false };

    default:
      return state;
  }
};

export default adminReducer;
