import { Navigation } from 'react-native-navigation';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../store/reducers';

let composeEnhancers = compose;

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);

export function registerScreens() {
  Navigation.registerComponentWithRedux(
    'Auth',
    () => require('./screens/Auth').default,
    Provider,
    store
  );
  Navigation.registerComponentWithRedux(
    'FindPlace',
    () => require('./screens/FindPlace').default,
    Provider,
    store
  );
  Navigation.registerComponentWithRedux(
    'SharePlace',
    () => require('./screens/SharePlace').default,
    Provider,
    store
  );
  Navigation.registerComponentWithRedux(
    'PlaceDetail',
    () => require('./screens/PlaceDetail').default,
    Provider,
    store
  );
  Navigation.registerComponentWithRedux(
    'SideMenu',
    () => require('./screens/SideMenu').default,
    Provider,
    store
  );
}
