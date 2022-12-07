import payloadConstants from "./constants";

const initialState = { isLoading: false, payloads: [] };

const payloadReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case payloadConstants.GET_PAYLOADS_REQUEST:
      return { ...state, isLoading: true };

    case payloadConstants.GET_PAYLOADS_SUCCESS:
      return { ...state, isLoading: false, payloads: payload };

    case payloadConstants.GET_PAYLOADS_FAILURE:
      return { ...state, isLoading: false };

    case payloadConstants.ADD_PAYLOADS_REQUEST:
      return { ...state, isLoading: true };

    case payloadConstants.ADD_PAYLOADS_SUCCESS:
      return { ...state, isLoading: false };

    case payloadConstants.ADD_PAYLOADS_FAILURE:
      return { ...state, isLoading: false };

    case payloadConstants.EDIT_PAYLOADS_REQUEST:
      return { ...state, isLoading: true };

    case payloadConstants.EDIT_PAYLOADS_SUCCESS:
      return { ...state, isLoading: false };

    case payloadConstants.EDIT_PAYLOADS_FAILURE:
      return { ...state, isLoading: false };

    default:
      return state;
  }
};

export default payloadReducer;
