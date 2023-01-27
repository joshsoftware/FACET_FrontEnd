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
    case facetAdminConstants.GET_ORGANIZATIONS_ADMIN_REQUEST:
      return { ...state, isLoading: true };

    case facetAdminConstants.GET_ORGANIZATIONS_ADMIN_SUCCESS:
      return { ...state, isLoading: false, organizations: payload };

    case facetAdminConstants.GET_ORGANIZATIONS_ADMIN_FAILURE:
      return { ...state, isLoading: false };

    case facetAdminConstants.GET_ORGANIZATION_ADMIN_REQUEST:
      return { ...state, isLoading: true };

    case facetAdminConstants.GET_ORGANIZATION_ADMIN_SUCCESS:
      return { ...state, isLoading: false, organization: payload };

    case facetAdminConstants.GET_ORGANIZATION_ADMIN_FAILURE:
      return { ...state, isLoading: false };

    case facetAdminConstants.GET_USERS_ADMIN_REQUEST:
      return { ...state, isLoading: true };

    case facetAdminConstants.GET_USERS_ADMIN_SUCCESS:
      return { ...state, isLoading: false, users: payload };

    case facetAdminConstants.GET_USERS_ADMIN_FAILURE:
      return { ...state, isLoading: false };

    default:
      return state;
  }
};

export default adminReducer;
