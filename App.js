import { Navigation } from 'react-native-navigation';
import { registerScreens } from './src/screens';

// Register Screens
registerScreens();

Navigation.events().registerNavigationButtonPressedListener(({ buttonId }) => {
  if (buttonId === 'sideMenuBtn') {
    Navigation.mergeOptions('SideMenuId', {
      sideMenu: {
        left: {
          visible: true
        }
      }
    });
  }
});

// Start App
Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'Auth'
            }
          }
        ],
        options: {
          topBar: {
            title: {
              text: 'Login'
            }
          }
        }
      }
    }
  });
});
