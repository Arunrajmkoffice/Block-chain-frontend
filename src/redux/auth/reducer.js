import {
    SIGIN_AUTH_FAILURE,
    SIGIN_AUTH_REQUEST,
    SIGIN_AUTH_SUCCESS,
  } from "./action";
  
  const initState = {
    isLoading: false,
    isError: false,
    error: [],
    siginAuth: [],
  };
  
  export const authReducer = (state = initState, action) => {
    switch (action.type) {
      case SIGIN_AUTH_REQUEST:
        return {
          ...state,
          isLoading: true,
          isError: false,
        };
  
      case SIGIN_AUTH_SUCCESS:
        return {
          ...state,
          isLoading: false,
          isError: false,
          siginAuth: action.payload,
        };
  
      case SIGIN_AUTH_FAILURE:
        return {
          ...state,
          isLoading: false,
          isError: true,
        };
  
      default:
        return {
          ...state,
        };
    }
  };