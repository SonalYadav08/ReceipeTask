import {Dispatch} from 'redux';
import {
  FETCH_RECIPES_REQUEST,
  FETCH_RECIPES_SUCCESS,
  FETCH_RECIPES_FAILURE,
} from './types';
import {fetchRecipes} from '../../services/api'; // Import the fetchRecipes function

// Fetch recipes with pagination using redux-thunk
export const fetchRecipesAction =
  (page: number = 1) =>
  async (dispatch: Dispatch) => {
    dispatch({type: FETCH_RECIPES_REQUEST});

    try {
      const data = await fetchRecipes(page); // Call the API function
      dispatch({
        type: FETCH_RECIPES_SUCCESS,
        payload: {
          recipes: data.recipes,
          hasMore: data.hasMore,
        },
      });
    } catch (error: any) {
      dispatch({
        type: FETCH_RECIPES_FAILURE,
        payload: error.message || 'Failed to fetch recipes',
      });
    }
  };
