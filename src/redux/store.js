import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

const rootReducer = (state = {}, action) => state; // Dummy reducer

const middlewares = [thunk];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

console.log('Store created successfully:', store);

export default store;
