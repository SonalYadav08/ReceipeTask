import {Dispatch} from 'redux';
import {loginUser} from '../../services/api'; // Import the API function
import {LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT} from '../types';

// Login action using redux-thunk
export const login = credentials => async dispatch => {
  dispatch({type: LOGIN_REQUEST});

  try {
    const response = await loginUser(credentials); // Call the API function
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        user: response.data.user,
        token: response.data.token,
      },
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response ? error.response.data.message : 'Login failed',
    });
  }
};

// Logout action
// export const logout = () => async (dispatch: Dispatch) => {
//   try {
//     await logoutApi(); // Call the logout API
//     dispatch({type: LOGOUT});
//   } catch (error) {
//     // Handle errors if necessary
//     console.error('Logout failed:', error);
//   }
// };
