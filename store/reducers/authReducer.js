export default function(state = { email: '', isAuthenticated: null }, action) {
  const { type, payload } = action;

  switch (type) {
    case 'AUTH':
      return { ...state, ...payload, isAuthenticated: true };
    default:
      return { ...state };
  }
}
