import payloadConstants from "./constants";

const initialState = { isLoading: false, payloads: [], errors: [] };

const payloadReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case payloadConstants.GET_PAYLOADS_REQUEST:
      return { ...state, isLoading: true };

    case payloadConstants.GET_PAYLOADS_SUCCESS:
      return { ...state, isLoading: false, payloads: payload, errors: [] };

    case payloadConstants.GET_PAYLOADS_FAILURE:
      return { ...state, isLoading: false, errors: payload };

    case payloadConstants.ADD_PAYLOADS_REQUEST:
      return { ...state, isLoading: true };

    case payloadConstants.ADD_PAYLOADS_SUCCESS:
      return { ...state, isLoading: false, errors: [] };

    case payloadConstants.ADD_PAYLOADS_FAILURE:
      return { ...state, isLoading: false, errors: payload };

    case payloadConstants.EDIT_PAYLOADS_REQUEST:
      return { ...state, isLoading: true };

    case payloadConstants.EDIT_PAYLOADS_SUCCESS:
      return { ...state, isLoading: false, errors: [] };

    case payloadConstants.EDIT_PAYLOADS_FAILURE:
      return { ...state, isLoading: false, errors: payload };

    default:
      return state;
  }
};

export default payloadReducer;
