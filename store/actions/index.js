// Add Place
export const addPlace = (placeName, coords, placeImage) => dispatch => {
  if (placeName.trim() === '') return;

  const newPlace = {
    key: Math.random().toString(),
    placeName,
    coords,
    placeImage
  };

  dispatch({ type: 'ADD_PLACE', payload: newPlace });
};

// Delete Place
export const removePlace = key => dispatch => {
  dispatch({ type: 'REMOVE_PLACE', payload: key });
};

// Login or Register
export const auth = authData => dispatch => {
  dispatch({ type: 'AUTH', payload: { email: authData.email } });
};
