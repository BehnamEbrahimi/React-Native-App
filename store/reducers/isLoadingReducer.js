export default function(state = false, action) {
  const { type } = action;

  switch (type) {
    case 'START_LOADING':
      return true;
    case 'STOP_LOADING':
      return false;
    default:
      return state;
  }
}
