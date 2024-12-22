import {combineReducers} from 'redux';
import authReducer from './authReducer';
import recipeReducer from './receipeReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  recipes: recipeReducer,
});

// export type RootState = ReturnType<typeof rootReducer>; // This will automatically infer the state type

export default rootReducer;
