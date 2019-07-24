export default function(state = [], action) {
  const { type, payload } = action;

  switch (type) {
    case 'ADD_PLACE':
      return [...state, payload];
    case 'REMOVE_PLACE':
      return state.filter(place => place.key !== payload);
    default:
      return [...state];
  }
}
