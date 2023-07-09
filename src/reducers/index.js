import {  applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import userReducer from '../features/users';
import { configureStore } from '@reduxjs/toolkit';
import betlinesReducer from '../features/betlines';
import betsReducer from '../features/bets';
import { gamesApi } from '../features/api/apiSlice';
import logger from 'redux-logger';




const rootReducer = combineReducers({
  user:userReducer,
  lines:betlinesReducer,
  bets:betsReducer,
  [gamesApi.reducerPath]:gamesApi.reducer
})

const middlewareEnhancer = applyMiddleware(thunk)

/* const composeWithDevTools =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
 */
/* const composedEnhancers = composeWithDevTools(middlewareEnhancer) */

const store =configureStore({ 
  reducer:rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger).concat(gamesApi.middleware),    
  enhancers: [middlewareEnhancer],
})


export default store;