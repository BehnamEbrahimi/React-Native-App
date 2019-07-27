import axios from 'axios';
import { AsyncStorage } from 'react-native';
import setAuthToken from '../../src/utils/setAuthToken';

const apiURI = 'http://10.0.2.2:5000';

// Start Loading
export const startLoading = () => dispatch => {
  dispatch({ type: 'START_LOADING' });
};

// Stop Loading
export const stopLoading = () => dispatch => {
  dispatch({ type: 'STOP_LOADING' });
};

// Add Place
export const addPlace = (placeName, placeImage, coords) => async dispatch => {
  dispatch(startLoading());

  const newPlace = {
    placeName,
    placeImage,
    coords
  };
  delete newPlace.placeImage.uri;

  try {
    const { data: place } = await axios.post(`${apiURI}/api/places`, newPlace);

    dispatch({ type: 'ADD_PLACE', payload: place });

    dispatch(stopLoading());
  } catch (ex) {
    dispatch(stopLoading());

    alert(`${ex.response.status}: ${ex.response.data}`);
  }
};

// Get All Places
export const getPlaces = () => async dispatch => {
  dispatch(startLoading());

  try {
    const { data: places } = await axios.get(`${apiURI}/api/places`);

    dispatch({ type: 'GET_PLACES', payload: places });

    dispatch(stopLoading());
  } catch (ex) {
    dispatch(stopLoading());

    alert(`${ex.response.status}: ${ex.response.data}`);
  }
};

// Delete Place
export const removePlace = key => async dispatch => {
  dispatch(startLoading());

  try {
    await axios.delete(`${apiURI}/api/places/${key}`);

    dispatch({ type: 'REMOVE_PLACE', payload: key });

    dispatch(stopLoading());
  } catch (ex) {
    dispatch(stopLoading());

    alert(`${ex.response.status}: ${ex.response.data}`);
  }
};

// Login
export const login = ({ email, password }) => async dispatch => {
  dispatch(startLoading());

  try {
    const { data: token } = await axios.post(`${apiURI}/api/auth`, {
      email,
      password
    });

    dispatch({ type: 'LOGIN_SUCCESS', payload: token });

    dispatch(stopLoading());

    dispatch(loadUser());
  } catch (ex) {
    dispatch(stopLoading());

    alert(`${ex.response.status}: ${ex.response.data}`);
  }
};

// Register User
export const register = ({ email, password }) => async dispatch => {
  dispatch(startLoading());

  try {
    const { data: token } = await axios.post(`${apiURI}/api/users`, {
      email,
      password
    });

    dispatch({ type: 'REGISTER_SUCCESS', payload: token });

    dispatch(stopLoading());

    dispatch(loadUser());
  } catch (ex) {
    dispatch(stopLoading());

    alert(`${ex.response.status}: ${ex.response.data}`);
  }
};

// Load User
export const loadUser = () => async dispatch => {
  dispatch(startLoading());

  const token = await AsyncStorage.getItem('@rn:key');

  setAuthToken(token);

  try {
    const { data: user } = await axios.get(`${apiURI}/api/users/me`);

    dispatch({ type: 'USER_LOADED', payload: user });

    dispatch(stopLoading());
  } catch (ex) {
    dispatch(stopLoading());

    console.log(`${ex.response.status}: ${ex.response.data}`);
  }
};

// Logout User
export const logout = () => dispatch => {
  dispatch({ type: 'CLEAR_PLACES' });
  dispatch({ type: 'LOGOUT' });
};
