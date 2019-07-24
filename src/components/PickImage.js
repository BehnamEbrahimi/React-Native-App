import React, { Fragment } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';

const PickImage = () => {
  const { placeholder, button } = styles;

  return (
    <Fragment>
      <View style={placeholder}>
        <Text>Image Preview!</Text>
      </View>
      <View style={button}>
        <Button title="Pick Image" />
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

export default PickImage;
