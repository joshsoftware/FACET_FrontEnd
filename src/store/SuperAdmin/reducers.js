import superAdminConstants from "./constants";

const initialState = { isLoading: false };

const superAdminReducer = (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case superAdminConstants.ADD_ADMINS_REQUEST:
      return { ...state, isLoading: true };

    case superAdminConstants.ADD_ADMINS_SUCCESS:
      return { ...state, isLoading: false };

    case superAdminConstants.ADD_ADMINS_FAILURE:
      return { ...state, isLoading: false };

    default:
      return state;
  }
};

export default superAdminReducer;
