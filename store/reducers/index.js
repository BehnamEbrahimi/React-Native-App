import { combineReducers } from 'redux';
import placesReducer from './placesReducer';
import authReducer from './authReducer';
import isLoadingReducer from './isLoadingReducer';

export default combineReducers({
  places: placesReducer,
  auth: authReducer,
  isLoading: isLoadingReducer
});
