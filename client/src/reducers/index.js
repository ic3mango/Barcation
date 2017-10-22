import { combineReducers } from 'redux';
import userReducer from './userReducer';
import barsReducer from './barsReducer';

export default combineReducers({
  user: userReducer,
  bars: barsReducer
});
