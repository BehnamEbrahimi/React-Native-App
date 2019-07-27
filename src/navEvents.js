import { Navigation } from 'react-native-navigation';
import { loginPage } from './navigations';

export function registerNavEvents() {
  Navigation.events().registerNavigationButtonPressedListener(
    ({ buttonId }) => {
      if (buttonId === 'sideMenuBtn') {
        Navigation.mergeOptions('SideMenuId', {
          sideMenu: {
            left: {
              visible: true
            }
          }
        });
      }
    }
  );

  Navigation.events().registerAppLaunchedListener(() => {
    loginPage();
  });
}
