import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SideMenu = () => {
  const { container, drawerItem, drawerItemIcon } = styles;

  return (
    <View style={container}>
      <TouchableOpacity>
        <View style={drawerItem}>
          <Icon
            name={Platform.OS === 'android' ? 'md-log-out' : 'ios-log-out'}
            size={30}
            color={'#aaa'}
            style={drawerItemIcon}
          />
          <Text>Sign Out</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 55,
    backgroundColor: 'white',
    flex: 1
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#eee'
  },
  drawerItemIcon: {
    marginRight: 10,
    marginLeft: 5
  }
});

export default SideMenu;
