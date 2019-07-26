import axios from 'axios';
//import setAuthToken from '../../src/utils/setAuthToken';

// Show Spinner
export const startLoading = () => dispatch => {
  dispatch({ type: 'START_LOADING' });
};

// Hide Spinner
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
    const { data: place } = await axios.post(
      'http://10.0.2.2:5000/api/places',
      newPlace
    );

    dispatch({ type: 'ADD_PLACE', payload: place });

    dispatch(stopLoading());
  } catch (ex) {
    dispatch(stopLoading());

    console.log({ msg: ex.response.data, status: ex.response.status });

    alert('Something went wrong.');
  }
};

// Get All Places
export const getPlaces = () => async dispatch => {
  dispatch(startLoading());

  try {
    const { data: places } = await axios.get('http://10.0.2.2:5000/api/places');

    dispatch({ type: 'GET_PLACES', payload: places });

    dispatch(stopLoading());
  } catch (ex) {
    dispatch(stopLoading());

    console.log({ msg: ex.response.data, status: ex.response.status });

    alert('Something went wrong.');
  }
};

// Delete Place
export const removePlace = key => async dispatch => {
  dispatch(startLoading());

  try {
    await axios.delete(`http://10.0.2.2:5000/api/places/${key}`);

    dispatch({ type: 'REMOVE_PLACE', payload: key });

    dispatch(stopLoading());
  } catch (ex) {
    dispatch(stopLoading());

    console.log({ msg: ex.response.data, status: ex.response.status });

    alert('Something went wrong.');
  }
};

// Login or Register
export const auth = authData => dispatch => {
  dispatch({ type: 'AUTH', payload: { email: authData.email } });
};
