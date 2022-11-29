import superAdminConstants from "./constants";

const initialState = { isLoading: false, errors: [] };

const superAdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case superAdminConstants.ADD_ADMINS_REQUEST:
      return { ...state, isLoading: true, errors: [] };

    case superAdminConstants.ADD_ADMINS_SUCCESS:
      return { ...state, isLoading: false, errors: [] };

    case superAdminConstants.ADD_ADMINS_FAILURE:
      return { ...state, isLoading: false, errors: action.payload };

    default:
      return state;
  }
};

export default superAdminReducer;
