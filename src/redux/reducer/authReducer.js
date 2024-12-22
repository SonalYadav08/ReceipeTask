import {LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT} from '../types';

interface AuthState {
  isLoading: boolean;
  user: null | object;
  token: null | string;
  error: string | null;
}

const initialState: AuthState = {
  isLoading: false,
  user: null,
  token: null,
  error: null,
};

const authReducer = (state = initialState, action: any): AuthState => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload.user,
        token: action.payload.token,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        token: null,
      };
    default:
      return state;
  }
};

export default authReducer;
