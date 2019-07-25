import axios from 'axios';
import setAuthToken from '../../src/utils/setAuthToken';

// Add Place
export const addPlace = (placeName, placeImage, coords) => async dispatch => {
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
  } catch (ex) {
    console.log({ msg: ex.response.data, status: ex.response.status });
  }
};

// Delete Place
export const removePlace = key => dispatch => {
  dispatch({ type: 'REMOVE_PLACE', payload: key });
};

// Login or Register
export const auth = authData => dispatch => {
  dispatch({ type: 'AUTH', payload: { email: authData.email } });
};
