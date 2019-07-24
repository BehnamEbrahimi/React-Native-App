import { combineReducers } from 'redux';
import placesReducer from './placesReducer';
import authReducer from './authReducer';

export default combineReducers({
  places: placesReducer,
  auth: authReducer
});
