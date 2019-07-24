import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const ListItem = ({ placeName, placeImage, handleItemSelect }) => (
  <TouchableOpacity onPress={handleItemSelect}>
    <View style={styles.listItem}>
      <Image source={placeImage} resizeMode="cover" style={styles.placeImage} />
      <Text>{placeName}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  listItem: {
    width: '100%',
    marginBottom: 5,
    padding: 10,
    backgroundColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center'
  },
  placeImage: {
    height: 30,
    width: 30,
    marginRight: 8
  }
});

export default ListItem;
