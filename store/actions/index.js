// Add Place
export const addPlace = placeName => dispatch => {
  if (placeName.trim() === '') return;

  const newPlace = {
    key: Math.random().toString(),
    placeName,
    placeImage: {
      uri:
        'https://image.shutterstock.com/image-vector/cute-smiling-welsh-corgi-dog-260nw-1014458896.jpg'
    }
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
