import React, { Fragment } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';

const PickLocation = () => {
  const { placeholder, button } = styles;

  return (
    <Fragment>
      <View style={placeholder}>
        <Text>Map</Text>
      </View>
      <View style={button}>
        <Button title="Locate Me" />
      </View>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  placeholder: {
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: '#eee',
    width: '80%',
    height: 150
  },
  button: {
    margin: 5
  }
});

export default PickLocation;
