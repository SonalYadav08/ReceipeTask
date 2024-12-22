import {
  FETCH_RECIPES_REQUEST,
  FETCH_RECIPES_SUCCESS,
  FETCH_RECIPES_FAILURE,
} from '../types';

interface RecipeState {
  isLoading: boolean;
  recipes: Array<any>;
  hasMore: boolean;
  error: string | null;
}

const initialState: RecipeState = {
  isLoading: false,
  recipes: [],
  hasMore: true,
  error: null,
};

const recipeReducer = (state = initialState, action: any): RecipeState => {
  switch (action.type) {
    case FETCH_RECIPES_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_RECIPES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        recipes: action.payload.recipes,
        hasMore: action.payload.hasMore,
      };
    case FETCH_RECIPES_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default recipeReducer;
