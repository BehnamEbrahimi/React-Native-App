export default function(state = [], action) {
  const { type, payload } = action;

  switch (type) {
    case 'ADD_PLACE':
      return [...state, payload];
    case 'GET_PLACES':
      return [...payload];
    case 'REMOVE_PLACE':
      return state.filter(place => place.key !== payload);
    case 'CLEAR_PLACES':
      return [];
    default:
      return [...state];
  }
}
