import { AsyncStorage } from 'react-native';

const execGetItem = async () => {
  return await AsyncStorage.getItem('@rn:key');
};
const token = execGetItem();

export default function(
  state = { email: '', isAuthenticated: false, token },
  action
) {
  const { type, payload } = action;

  switch (type) {
    case 'REGISTER_SUCCESS':
    case 'LOGIN_SUCCESS':
      const execSetItem = async () => {
        await AsyncStorage.setItem('@rn:key', payload);
      };
      execSetItem();
      return { ...state, isAuthenticated: true, token: payload };

    case 'USER_LOADED':
      return { ...state, ...payload, isAuthenticated: true };

    case 'LOGOUT':
      const execRemoveItem = async () => {
        await AsyncStorage.removeItem('@rn:key');
      };
      execRemoveItem();
      return { email: '', isAuthenticated: false, token: null };

    default:
      return { ...state };
  }
}
