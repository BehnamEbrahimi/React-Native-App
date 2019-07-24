import { Platform } from 'react-native';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

export const startMainTabs = async () => {
  const findIcon = await Icon.getImageSource(
    Platform.OS === 'android' ? 'md-map' : 'ios-map',
    30
  );
  const shareIcon = await Icon.getImageSource(
    Platform.OS === 'android' ? 'md-share-alt' : 'ios-share-alt',
    30
  );
  const sideMenuIcon = await Icon.getImageSource(
    Platform.OS === 'android' ? 'md-menu' : 'ios-menu',
    30
  );

  Navigation.setRoot({
    root: {
      sideMenu: {
        left: {
          component: {
            name: 'SideMenu',
            id: 'SideMenuId'
          }
        },
        center: {
          bottomTabs: {
            id: 'BottomTabsId',
            children: [
              {
                stack: {
                  id: 'FindPlace',
                  children: [
                    {
                      component: {
                        name: 'FindPlace',
                        options: {
                          bottomTab: {
                            fontSize: 12,
                            text: 'Find Place',
                            icon: findIcon,
                            selectedIconColor: 'orange'
                          },
                          topBar: {
                            title: {
                              fontSize: 16,
                              text: 'Find Place'
                            },
                            leftButtons: [
                              {
                                id: 'sideMenuBtn',
                                icon: sideMenuIcon,
                                color: 'orange'
                              }
                            ]
                          }
                        }
                      }
                    }
                  ]
                }
              },
              {
                stack: {
                  children: [
                    {
                      component: {
                        name: 'SharePlace',
                        options: {
                          bottomTab: {
                            fontSize: 12,
                            text: 'Share Place',
                            icon: shareIcon,
                            selectedIconColor: 'orange'
                          },
                          topBar: {
                            title: {
                              fontSize: 16,
                              text: 'Share Place'
                            },
                            leftButtons: [
                              {
                                id: 'sideMenuBtn',
                                icon: sideMenuIcon,
                                color: 'orange'
                              }
                            ]
                          }
                        }
                      }
                    }
                  ]
                }
              }
            ]
          }
        }
      }
    }
  });
};

export const showPlaceDetails = (placeKey, placeName, placeImage) => {
  Navigation.push('FindPlace', {
    component: {
      name: 'PlaceDetail',
      options: {
        topBar: {
          title: {
            text: placeName
          }
        }
      },
      passProps: {
        placeKey,
        placeName,
        placeImage
      }
    }
  });
};

export const closePlaceDetails = () => {
  Navigation.pop('FindPlace');
};
