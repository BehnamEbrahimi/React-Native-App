import { registerScreens, store } from './src/screens';
import { registerNavEvents } from './src/navEvents';
import { loadUser } from './store/actions';

store.dispatch(loadUser());

// Register Screens
registerScreens();

// Register Navigation Events
registerNavEvents();
